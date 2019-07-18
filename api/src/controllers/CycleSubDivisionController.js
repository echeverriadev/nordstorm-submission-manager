"use strict";

const knex = require("../../config/database");
const CycleSubDivisionTransformer = require("../transformers/CycleSubDivisionTransformer");
const helper = require("../helpers/Helper");

class CycleSubDivisionController {
  constructor() {
    this.addCycleSubDivisionRow = this.addCycleSubDivisionRow.bind(this);
    this.cycleSubDivisionTransformer = CycleSubDivisionTransformer;
  }

  async addCycleSubDivisionRow(req, res, next) {
    const { cycleId, subdivisionId } = req.body;
    let model = {};

    return knex("cycle_subdivision")
      .where({
        _fk_cycle: cycleId,
        _fk_subdivision: subdivisionId
      })
      .then(response => {
        let data = this.cycleSubDivisionTransformer.transform(response);
        if (data.length === 0) {
          return knex("cycle_subdivision")
            .insert({ _fk_cycle: cycleId, _fk_subdivision: subdivisionId })
            .then(response => {
              let cycleSubDivisionId = response;

              return knex("cycle_subdivision")
                .where("id", cycleSubDivisionId)
                .then(response => {
                  response.forEach(cycleSubDivision => {
                    model = cycleSubDivision;
                  });

                  res.json({
                    code: 200,
                    message: "Row saved successfully.",
                    model,
                    emailData: helper.getEmailData()
                  });
                })
                .catch(error => {
                  res.json({
                    code: error.errno,
                    message: error
                  });
                });
            })
            .catch(error => {
              res.json({
                code: error.errno,
                message: error
              });
            });
        } else {
          res.json({
            code: 200,
            message: "Row already exists.",
            model: data[0],
            emailData: helper.getEmailData()
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  getEmailData() {
    let email = {
      address: process.env.EMAIL_ADDRESS,
      subject: process.env.EMAIL_SUBJECT
    };

    return email;
  }
}

module.exports = new CycleSubDivisionController();
