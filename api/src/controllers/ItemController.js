'use strict'
const dbConnection = require('../../config/mysql');
const ItemTransformer = require('../transformers/ItemTrasformer');
const {hasEmptyField} = require('../Utils');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");

class ItemController {
    constructor(){
        this.connection = dbConnection()
        this._itemTransformer = ItemTransformer;
        this.index = this.index.bind(this);
        this.updatePatch = this.updatePatch.bind(this);
        this.import = this.import.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }
    //This method must be paged
    async index(req, res, next){
        const range = req.query.range
        let start, end
        try{
            [start, end] = JSON.parse(range)
        }catch(err){
            [start, end] = [0,9]
        }
        const limit = end - start + 1
        const {divisionId, cycleId} = req.query
        this.connection.query(
            `SELECT * FROM item_editorial LIMIT ?, ?;
            SELECT COUNT( __pk_item ) as total FROM item_editorial;`,
            [start, limit],
            (err, result) => {
                if(err){
                    return res.status(500).json({error: err})
                }

                res.status(200).json({
                    status: 200,
                    massage: "Items Found",
                    data: this._itemTransformer.transform(result[0]),
                    total: result[1][0].total
                })
        })
    }

    async import(req, res, next){
        let exceltojson;

        if(!req.file){
            return res.json({
                code: 404,
                message: "file not found"
            });
        }

        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }

        try {
            exceltojson({
                input: req.file.path,
                output: null, //since we don't need output.json
                lowerCaseHeaders:true
            }, function(err,result){
                if(err) {
                    return res.json({code: 400, message: err});
                }

                const data = []

                for (let i in result){
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

                    dbConnection().query('INSERT INTO item_editorial SET ?', row, function (error,        results, fields) {
                        if (error) throw error;
                        console.log(results)
                      });

                    data.push(row);
                }

                res.json({code: 200, data});
            });
        } catch (e){24
            return res.json({code: 400, message:"Corupted excel file"});
        }
    }

    async uploadImage(req, res, next){
        if(!req.file){
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

    async updatePatch(req, res, next){
        const {id} = req.params
        const {field, value} = req.body
        const escaping = [field, value, id]
        if(hasEmptyField(escaping))
            return res.status(400).json({status: 400, massage: "Bad Request"})

        this.connection.query('UPDATE item_editorial SET ?? = ? WHERE __pk_item = ?', escaping, (err, result) => {
            if(err){
                console.log(err)
                return res.status(500).json({error: err})
            }

            if(result.affectedRows)
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
