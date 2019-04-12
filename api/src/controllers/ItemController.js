'use strict'
const dbConnection = require('../../config/mysql');
const ItemTransformer = require('../transformers/ItemTrasformer');
const {hasEmptyField} = require('../Utils');
const fs = require('fs');
const xlsxj = require("xlsx-to-json");

class ItemController {
    constructor(){
        this.connection = dbConnection()
        this._itemTransformer = ItemTransformer;
        this.index = this.index.bind(this);
        this.updatePatch = this.updatePatch.bind(this);
        this.import = this.import.bind(this);
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
        console.log(req.file)
        res.json({message: "paso"})
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
