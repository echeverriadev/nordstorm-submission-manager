'use strict'
const dbConnection = require('../../config/mysql');
const mysql = require('mysql');
const ItemTransformer = require('../transformers/ItemTrasformer');
const { hasEmptyField } = require('../Utils');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");

class ItemController {
    constructor() {
        this.connection = dbConnection()
        this._itemTransformer = ItemTransformer;
        this.index = this.index.bind(this);
        this.updatePatch = this.updatePatch.bind(this);
        this.import = this.import.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.buildWhere = this.buildWhere.bind(this);
        this.buildOrder = this.buildOrder.bind(this);
        this.escapeSansQuotes = this.escapeSansQuotes.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
        this.duplicateItem = this.duplicateItem.bind(this);
        this.cleanCountryOfOriginOther = this.cleanCountryOfOriginOther.bind(this);
    }

    escapeSansQuotes(criterion) {
      return this.connection.escape(criterion).match(/^'(\w+)'$/)[1];
    }



    buildWhere(filter = {}) {
        const fieldsLikeForSearch =  {
            "dept": "item_editorial.department_number",
            "vpn": "vpn",
            "sgn": "style_group_number",
            "brand": "brand",
            "color": "color",
            "size": "size",
            "description": "description",
            "product_priority": "is_priority",
            "in_stock_week": "in_stock_week",
            "country_of_origin": "country_of_origin",
            "specify_country": "country_of_origin_other",
            "extension_reason": "request_extension_note",
            "cancelation_reason": "request_cancellation_notes"
        }
        
        const fieldsJoinForSearch = {
            "story": "creative_story.name",
            "shot": "shot.name",
        }
        
        let specialCaseJoinField = null
        
            
        // const fieldsForSearch = ["department_number", "vpn", "style_group_number", "brand", "color", "size", "description", "in_stock_week", "country_of_origin"]
        let conditions = []
        let values = []

        if(filter.hasOwnProperty('divisionId') && filter.divisionId !== "ALL"){
            conditions.push("_fk_division = ?")
            values.push(filter.divisionId)
        }
        if(filter.hasOwnProperty('cycleId')){
            conditions.push("_fk_cycle = ?")
            values.push(filter.cycleId)
        }

        if (filter.hasOwnProperty('parseCannedFilters') && filter.parseCannedFilters.length)
            conditions = conditions.concat(filter.parseCannedFilters)

        if (filter.hasOwnProperty('search')) {
            const searchText = filter.search
            const pattern = /([\w\s]+)\:?\s?([\w\s]*)/g
            /* searchText could be like this: "text to search in many fields" or "field: text to search in field"
                On first case, field will be the whole text
                On second case, field: "field" and value: "text to search in field"
            */
            
            searchText.replace(pattern, (_, field, value) => {
                if (value){ //second case
                    if(Object.keys(fieldsLikeForSearch).includes(field)) //and field is simply like search
                        if(fieldsLikeForSearch[field] == "is_priority" || fieldsLikeForSearch[field] == "in_stock_week" ){
                            conditions.push(fieldsLikeForSearch[field] + "=" + this.connection.escape(value))
                        }else{
                            conditions.push(`${fieldsLikeForSearch[field]} LIKE ${this.connection.escape('%'+value+'%')}`)
                        }
                    else if(field == "product_priority"){
                        const priorityBoolean = value.toLowerCase() === "yes" || value.toLowerCase() === "y" ? 1 : 0
                        conditions.push(`is_priority = ${this.connection.escape(priorityBoolean)}`)
                    }
                    else if(Object.keys(fieldsJoinForSearch).includes(field)) {
                        specialCaseJoinField = field
                        conditions.push(`${fieldsJoinForSearch[field]} LIKE ${this.connection.escape('%'+value+'%')}`)
                    } else
                        conditions.push('null') //The search was something like: "fieldDoesntExist: value", so push null for don't get anything
                        
                }
                else { //first case
                    const conditionLikeString = Object.values(fieldsLikeForSearch).join(',')
                    conditions.push(`(CONCAT_WS(${conditionLikeString}) LIKE ${this.connection.escape('%'+field+'%')})`)
                }
            })
        }

        return {
            where: conditions.length ? conditions.join(' AND ') : 1,
            values,
            specialCaseJoinField
        }
    }

    buildOrder(query){
        const numericFields = ["is_priority", "department_number", "style_group_number", "retail_price", "__pk_item"]
        let order = []
        let orderByEscaping = []
        if(query.hasOwnProperty('order') && query.order.length){
            query.order = query.order + ',__pk_item,ASC';
            order = query.order.split(','); //[field1, ASC, field2, DESC...]
        } else{
            order = ['__pk_item','ASC'];
        }
		for(let i = 0; i < order.length -1 ; i+=2){
		    if(numericFields.includes(order[i]))
		        orderByEscaping.push(`CAST(item_editorial.${this.escapeSansQuotes(order[i])} AS unsigned) ${this.escapeSansQuotes(order[i+1])}`)
		    else
		        orderByEscaping.push("item_editorial."+this.escapeSansQuotes(order[i]) + " " + this.escapeSansQuotes(order[i+1]))
		}


		return orderByEscaping.length ? "ORDER BY " + orderByEscaping.join(', ') : ''
    }

    async index(req, res, next) {
        let { filter } = req.query
        const range = req.query.range || "[0,9]"
        const [start, end] = JSON.parse(range)
        try {
            filter = JSON.parse(filter)
        }
        catch (err) {
            filter = {}
        }
        const { where, values, specialCaseJoinField } = this.buildWhere(filter)
        const orderBy = this.buildOrder(req.query)
        console.log(orderBy)
        const limit = end - start + 1
        const allValues = [...values, start, limit]
        let sqlCount, sqlItems
        if(specialCaseJoinField === "shot"){
            sqlCount = `SELECT COUNT( __pk_item ) as total FROM item_editorial 
            INNER JOIN shot ON item_editorial._fk_shot = shot.__pk_shot 
            WHERE ${where}`
            
            sqlItems = `SELECT item_editorial.*, department.name_display as department,
            department.department_number as d_department_number FROM item_editorial
            INNER JOIN shot ON item_editorial._fk_shot = shot.__pk_shot 
            LEFT OUTER JOIN department ON item_editorial.department_number = department.department_number
            WHERE ${where} ${orderBy} LIMIT ?, ?`
        } else if (specialCaseJoinField === "story") {
            sqlCount = `SELECT COUNT( __pk_item ) as total FROM item_editorial 
            INNER JOIN shot ON item_editorial._fk_shot = shot.__pk_shot 
            INNER JOIN campaign ON shot._fk_campaign = campaign.__pk_campaign 
            INNER JOIN creative_story ON campaign._fk_creative_story = creative_story.__pk_creative_story 
            WHERE ${where}`
            
            sqlItems = `SELECT item_editorial.*, department.name_display as department,
            department.department_number as d_department_number FROM item_editorial
            INNER JOIN shot ON item_editorial._fk_shot = shot.__pk_shot 
            INNER JOIN campaign ON shot._fk_campaign = campaign.__pk_campaign 
            INNER JOIN creative_story ON campaign._fk_creative_story = creative_story.__pk_creative_story 
            LEFT OUTER JOIN department ON item_editorial.department_number = department.department_number
            WHERE ${where} ${orderBy} LIMIT ?, ?`
        } else {
            sqlCount = `SELECT COUNT( __pk_item ) as total FROM item_editorial WHERE ${where}`
            sqlItems = `SELECT item_editorial.*, department.name_display as department,
            department.department_number as d_department_number FROM item_editorial
            LEFT OUTER JOIN department ON item_editorial.department_number = department.department_number
            WHERE ${where} ${orderBy} LIMIT ?, ?`
        }
        sqlCount = mysql.format(sqlCount, values);
        sqlItems = mysql.format(sqlItems, allValues);
        console.log(sqlItems)
        this.connection.query(`${sqlItems}; ${sqlCount}`, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err })
            }

            res.status(200).json({
                status: 200,
                massage: "Items Found",
                data: this._itemTransformer.transform(result[0]),
                total: result[1][0].total
            })
        })
    }

    async store(req, res, next){
        const data = {
            nmg_priority: req.body.nmg_priority || "",
            department_number: req.body.department_number || "",
            vpn: req.body.vpn || "",
            brand: req.body.brand || "",
            color: req.body.color || "",
            size: req.body.size || "",
            description: req.body.description || "",
            image: req.body.image || null,
            style_group_number: req.body.style_group_number || null,
            in_stock_week: req.body.in_stock_week || null,
            sale_price: req.body.sale_price || 0,
            _fk_cycle: req.body._fk_cycle || null,
            _fk_division: req.body._fk_division || null,
            retail_price: req.body.retail_price || 0,
            is_priority: req.body.is_priority || null,
            available_in_canada: req.body.available_in_canada || null,
            price_cad: req.body.price_cad || 0,
            country_of_origin: req.body.country_of_origin || "",
            country_of_origin_other: req.body.country_of_origin_other || "",
            request_extension: req.body.request_extension || null,
            request_extension_note: req.body.request_extension_notes || "",
            request_cancellation: req.body.request_cancellation || null,
            request_cancellation_notes: req.body.request_cancellation_notes || "",
            tagged_missy: req.body.tagged_missy || 0,
            tagged_encore: req.body.tagged_encore ||0,
            tagged_petite: req.body.tagged_petite || 0,
            tagged_extended: req.body.tagged_extended || 0
        }

        dbConnection().query('INSERT INTO item_editorial SET ?', data, function (error,        results, fields) {
            if (error) throw error;

            res.json({
                code: 200,
                message: "Item save",
                data: {
                    id: results.insertId,
                    ...data
                }
            })
          });
    }

    async import(req, res, next){
        let exceltojson;
        console.log(req.file)
        console.log(req.body)
        const {_fk_cycle, _fk_division } = req.body

        if (!req.file) {
            return res.json({
                code: 404,
                message: "file not found"
            });
        }

        if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        }
        else {
            exceltojson = xlstojson;
        }

        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders: true
            }, (err, result) => {
                if (err) {
                    return res.json({ code: 400, message: err });
                }

                const data = []

                for (let i in result) {
                    const element = result[i];

                    const row = {
                        'is_priority': element['priority'] || "",
                        'department_number': element['dept. no'] || "",
                        'vpn': element['vpn'] || "",
                        'brand': element['brand'] || "",
                        'color': element['color'] || "",
                        'size': element['size'] || "",
                        'description': element['description'] || "",
                        _fk_cycle,
                        _fk_division
                    };

                    this.connection.query('INSERT INTO item_editorial SET ?', row, function(error, results, fields) {
                        if (error) throw error;
                        console.log(results)
                    });

                    data.push(row);
                }

                res.json({ code: 200, data });
            });
        }
        catch (e) {
            24
            return res.json({ code: 400, message: "Corupted excel file" });
        }
    }

    async uploadImage(req, res, next) {
        if (!req.file) {
            return res.status(404).json({
                code: 404,
                message: "file not found"
            });
        }

        const url = `${process.env.API_URL}/uploads/images/${req.file.filename}`

        return res.json({
            code: 200,
            message: "Image uploaded",
            data: {
                url
            }
        });
    }

    async updatePatch(req, res, next) {
        const { id } = req.params
        const { field, value } = req.body
        const escaping = [field, value, id]
        const refresh = this.updateRelatedField(field);
        //if country_of_origin was update to another value distinct to Imported - Specify Country, It must clean the field country_of_origin_other
        if(field === "country_of_origin" && value !== "Imported - Specify Country") 
            this.cleanCountryOfOriginOther(id)
       // if (hasEmptyField(escaping))
         //   return res.status(400).json({ status: 400, massage: "Bad Request" })
        
        this.connection.query('UPDATE item_editorial SET ?? = ? WHERE __pk_item = ?', escaping, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ error: err })
            }

            if (result.affectedRows)
                res.status(200).json({
                    status: 200,
                    massage: "Item update",
                    refresh
                })
            else
                res.status(404).json({
                    status: 404,
                    massage: "Item not found",
                })
        })
    }

    updateRelatedField(field) {
        const relatedFields = ['department_number'];
        if (!field) {
            return false;
        }
        if (relatedFields.indexOf(field) !== -1) {
            return true;
        }
        return false;
    }
    
    cleanCountryOfOriginOther(_pk_item) {
        console.log("cleanCountryOfOriginOther")
        this.connection.query('UPDATE item_editorial SET country_of_origin_other = NULL WHERE __pk_item = ?', [_pk_item], (err, result) => {
            console.error(err)
            console.log(result)
        })
    }

    async deleteRecord(req, res, next) {
        const { id } = req.params
        const escaping = [id]
        if (hasEmptyField(escaping))
            return res.status(400).json({ status: 400, message: "Bad Request" })

        this.connection.query('DELETE FROM `item_editorial` WHERE `__pk_item` = ?', escaping, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ error: err })
            }

            if (result.affectedRows)
                res.status(200).json({
                    status: 200,
                    message: "Item deleted"
                })
            else
                res.status(404).json({
                    status: 404,
                    message: "Item not found"
                })
        })
    }

    async duplicateItem(req, res, next) {
        const { id } = req.params
        const escaping = [id]
        if (hasEmptyField(escaping))
            return res.status(400).json({ status: 400, message: "Bad Request" })

        const queryStrings = 'DROP TEMPORARY TABLE IF EXISTS tmp_item_editorial; '
                           + 'CREATE TEMPORARY TABLE tmp_item_editorial SELECT * FROM item_editorial WHERE `__pk_item` = ?; '
                           + 'ALTER TABLE tmp_item_editorial MODIFY `__pk_item` int null; '
                           + 'UPDATE tmp_item_editorial SET `__pk_item` = NULL; '
                           + 'SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0; '
                           + 'INSERT INTO item_editorial SELECT * FROM tmp_item_editorial; '
                           + 'SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS; ';

        this.connection.query(queryStrings, escaping, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ error: err })
            }

            res.status(200).json({
                status: 200,
                message: "Item duplicated"
            })
        })
    }

}

module.exports = new ItemController();
