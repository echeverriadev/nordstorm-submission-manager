"use strict";
const dbConnection = require("../../config/mysql");
const SubDivisionTransformer = require("../transformers/SubDivisionTransformer");

class SubDivisionController {
  constructor() {
    this.connection = dbConnection();
    this.subDivisionTransformer = SubDivisionTransformer;
    this.index = this.index.bind(this);
  }

  async index(req, res, next) {
    let idDivision = req.params.idDivision;
    let query = `select DISTINCT subdivisions.__pk_subdivision, subdivisions.name
      from subdivisions 
      join department on department.id_division_sub = subdivisions.kp_SubDivisionID
      join division on department._fk_division_t = division.__pk_division_t
      where division.__pk_division_t = ?`;

    this.connection.query(query, idDivision, (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({
        status: 200,
        massage: "Found subdivisions",
        data: this.subDivisionTransformer.transform(result)
      });
    });
  }
}

module.exports = new SubDivisionController();
