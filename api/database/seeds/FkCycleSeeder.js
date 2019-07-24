let faker = require("faker");

let updateItem = (knex, data) => {
  return knex("item_editorial")
    .where("__pk_item", "=", data.itemId)
    .update("_fk_cycle", data.cycleId);
};

exports.seed = function(knex) {
  let cycleIds = [];
  let itemIds = [];
  return knex
    .select("__pk_cycle")
    .from("cycle")
    .then(function(rows) {
      rows.forEach((row, index) => {
        cycleIds.push(row.__pk_cycle);
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
            let cycleId = faker.random.arrayElement(cycleIds);
            let data = {
              itemId: itemIds[i],
              cycleId
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
