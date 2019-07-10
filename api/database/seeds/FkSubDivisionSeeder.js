let faker = require("faker");

let updateItem = (knex, data) => {
  return knex("item_editorial")
    .where("__pk_item", "=", data.itemId)
    .update("_fk_subdivision", data.subdivisionId);
};

exports.seed = function(knex) {
  let subdivisionIds = [];
  let itemIds = [];
  return knex
    .select("__pk_subdivision")
    .from("subdivisions")
    .then(function(rows) {
      rows.forEach((row, index) => {
        subdivisionIds.push(row.__pk_subdivision);
      });

      return knex
        .select("__pk_item")
        .from("item_editorial")
        .then(function(rows) {
          let updatedItems = [];
          rows.forEach(row => {
            itemIds.push(row.__pk_item);
          });

          for (let i = 0; i < itemIds.length; i++) {
            let subdivisionId = faker.random.arrayElement(subdivisionIds);
            let data = {
              itemId: itemIds[i],
              subdivisionId: subdivisionId
            };

            updatedItems.push(updateItem(knex, data));
          }

          console.log("Updated: " + updatedItems.length + " items.");
          return Promise.all(updatedItems);
        })
        .catch(function(error) {
          console.error(error);
        });
    })
    .catch(function(error) {
      console.error(error);
    });
};
