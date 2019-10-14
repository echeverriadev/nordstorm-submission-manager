exports.up = function(knex) {
  return knex.schema.table("item_editorial", function(t) {
    t.integer("_fk_subdivision").defaultTo(null);
  });
};

exports.down = function(knex) {
  return knex.schema.table("item_editorial", function(t) {
    t.dropColumn("_fk_subdivision");
  });
};
