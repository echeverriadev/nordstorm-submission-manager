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
    }

    escapeSansQuotes(criterion) {
      return this.connection.escape(criterion).match(/^'(\w+)'$/)[1];
    }



    buildWhere(filter = {}) {
        //const fieldsForSearch =  ["department_number", "vpn", "style_group_number", "brand", "color", "size", "description", "in_stock_week", "story", "shot", "product_priority", "country_of_origin", "specify_country", "extension_reason", "cancelation_reason"]
        const fieldsForSearch = ["department_number", "vpn", "style_group_number", "brand", "color", "size", "description", "in_stock_week", "country_of_origin"]
        let conditions = []
        let values = []

        /* AHORA ESTAN VACIOS LOS CAMPOS PERO AQUI VA*/
        /*if(filter.hasOwnProperty('divisionId')){
            conditions.push("_fk_division = ?")
            values.push(filter.divisionId)
        }
        if(filter.hasOwnProperty('cycleId')){
            conditions.push("_fk_cycle = ?")
            values.push(filter.cycleId)
        }*/

        /* HASTA AQUI*/

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
                    if(fieldsForSearch.includes(field)) //and field really exist
                        conditions.push(`${field} LIKE ${this.connection.escape('%'+value+'%')}`)
                }
                else { //first case
                    const conditionLikeString = fieldsForSearch.join(',')
                    conditions.push(`(CONCAT_WS(${conditionLikeString}) LIKE ${this.connection.escape('%'+field+'%')})`)
                }
            })
        }

        return {
            where: conditions.length ? conditions.join(' AND ') : 1,
            values
        }
    }

    buildOrder(query){
        let order = []
        let orderByEscaping = []
        if(query.hasOwnProperty('order') && query.order.length){
			order = query.order.split(','); //[field1, ASC, field2, DESC...]
        }
		for(let i = 0; i < order.length -1 ; i+=2)
		    orderByEscaping.push(this.escapeSansQuotes(order[i]) + " " + this.escapeSansQuotes(order[i+1]))


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
        const { where, values } = this.buildWhere(filter)
        const orderBy = this.buildOrder(req.query)
        console.log(orderBy)
        const limit = end - start + 1
        let sqlCount = `SELECT COUNT( __pk_item ) as total FROM item_editorial WHERE ${where}`
        sqlCount = mysql.format(sqlCount, values);
        const allValues = [...values, start, limit]
        let sqlItems = `SELECT * FROM item_editorial WHERE ${where} ${orderBy} LIMIT ?, ?`
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
            'is_priority': req.body.is_priority || "",
            'department_number': req.body.department_number || "",
            'vpn': req.body.vpn || "",
            'brand': req.body.brand || "",
            'color': req.body.color || "",
            'size': req.body.size || "",
            'description': req.body.description || "",
            'image': req.body.image,
            'style_group_number': req.body.style_group_number,
            'in_stock_week': req.body.in_stock_week,
            'sale_price': req.body.price
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
            }, function(err, result) {
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
                        'description': element['description'] || ""
                    };

                    dbConnection().query('INSERT INTO item_editorial SET ?', row, function(error, results, fields) {
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
        if (hasEmptyField(escaping))
            return res.status(400).json({ status: 400, massage: "Bad Request" })

        this.connection.query('UPDATE item_editorial SET ?? = ? WHERE __pk_item = ?', escaping, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ error: err })
            }

            if (result.affectedRows)
                res.status(200).json({
                    status: 200,
                    massage: "Item update",
                })
            else
                res.status(404).json({
                    status: 404,
                    massage: "Item not found",
                })
        })
    }

}

module.exports = new ItemController();
