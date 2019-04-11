'use strict'
const dbConnection = require('../../config/mysql');
const DivisionTransformer = require('../transformers/DivisionTrasformer');

class DivisionController {
    constructor(){
        this.connection = dbConnection()
        this._divisionTransformer = DivisionTransformer;
        this.index = this.index.bind(this);
    }

    async index(req, res, next){
        this.connection.query('SELECT * FROM division WHERE active_fs = 1', (err, result) => {
            if(err){
                res.status(500).json({error: err})
            }

            res.status(200).json({
                status: 200,
                massage: "Divisions Found",
                data: this._divisionTransformer.transform(result)
            })
        })
    }

}

module.exports = new DivisionController();
