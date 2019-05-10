'use strict'
const dbConnection = require('../../config/mysql');
const ItemLogTrasformer = require('../transformers/ItemLogTrasformer');

class ItemLogController {
    constructor(){
        this.connection = dbConnection()
        this._itemLogTrasformer = ItemLogTrasformer;
        this.index = this.index.bind(this);
    }

    async index(req, res, next){
        // SELECT _fk_item_editorial, user_name, time_stamp,`event`, details FROM fit.log;
        // this.connection.query('SELECT * FROM division WHERE active_fs = 1', (err, result) => {

        // this.connection.query('SELECT _fk_item_editorial, user_name, time_stamp,`event`, details FROM fit.log', (err, result) => {
        this.connection.query('SELECT * FROM log WHERE _fk_item_editorial=10137301', (err, result) => {
                if(err){
                res.status(500).json({error: err})
            }

            res.status(200).json({
                status: 200,
                massage: "ItemLog Found",
                data: this._itemLogTrasformer.transform(result)
            })
        })
    }

}

module.exports = new ItemLogController();