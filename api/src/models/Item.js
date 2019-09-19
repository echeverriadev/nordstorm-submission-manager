"use strict";

const knex = require("../../config/database");

let update = async (itemId, data) => {
  return knex("item_editorial")
    .where({
      __pk_item: itemId
    })
    .update(data)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

module.exports = {
  update
};
