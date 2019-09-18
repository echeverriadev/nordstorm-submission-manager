"use strict";

const knex = require("../../config/database");
const departmentTransformer = require("../transformers/DepartmentTransformer");

let getDepartmentByDepartmentNumber = async departmentNumber => {
  return knex("department")
    .where({
      department_number: departmentNumber
    })
    .then(response => {
      return departmentTransformer.transform(response);
    })
    .catch(error => {
      return error;
    });
};

module.exports = {
  getDepartmentByDepartmentNumber
};
