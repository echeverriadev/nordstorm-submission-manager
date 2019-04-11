'use strict'
const dbConnection = require('../../config/mysql');
const CycleTransformer = require('../transformers/CycleTransformer');

class CycleController {
    constructor(){
        this.connection = dbConnection()
        this._cycleTransformer = CycleTransformer;
        this.index = this.index.bind(this);
    }

    async index(req, res, next){
        this.connection.query('SELECT * FROM cycle WHERE is_active = 1', (err, result) => {
            if(err){
                res.status(500).json({error: err})
            }

            res.status(200).json({
                status: 200,
                massage: "Cycles Found",
                data: this._cycleTransformer.transform(result)
            })
        })
    }

}

module.exports = new CycleController();
