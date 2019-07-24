let faker = require("faker");

let updateItem = (knex, data) => {
  return knex("item_editorial")
    .where("__pk_item", "=", data.itemId)
    .update("_fk_division", data.divisionId);
};

exports.seed = function(knex) {
  let divisionIds = [];
  let itemIds = [];
  return knex
    .select("__pk_division_t")
    .from("division")
    .then(function(rows) {
      rows.forEach((row, index) => {
        divisionIds.push(row.__pk_division_t);
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
            let divisionId = faker.random.arrayElement(itemIds);
            let data = {
              itemId: itemIds[i],
              divisionId
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
