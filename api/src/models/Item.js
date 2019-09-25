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

let getById = async id => {
  return knex("item_editorial")
    .where({
      __pk_item: id
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error(error);
    });
};

let isItemAttachedToStory = async id => {
  return knex
    .select("_fk_shot")
    .from("item_editorial")
    .where({ __pk_item: id })
    .then(response => {
      return JSON.parse(JSON.stringify(response))[0];
    })
    .catch(error => {
      console.error(error);
    });
};

let getItemImageName = async id => {
  return knex
    .select("image")
    .from("item_editorial")
    .where({ __pk_item: id })
    .then(response => {
      return JSON.parse(JSON.stringify(response))[0];
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports = {
  update,
  getById,
  isItemAttachedToStory,
  getItemImageName
};
