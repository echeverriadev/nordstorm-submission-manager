"use strict";

const knex = require("../../config/database");
const CycleSubDivisionTransformer = require("../transformers/CycleSubDivisionTransformer");

let getCycleSubDivision = (cycleId, subdivisionId) => {
  return knex("cycle_subdivision")
    .where({
      _fk_cycle: cycleId,
      _fk_subdivision: subdivisionId
    })
    .then(response => {
      return CycleSubDivisionTransformer.transform(response);
    })
    .catch(error => {
      return error;
    });
};

module.exports = {
  getCycleSubDivision
};
