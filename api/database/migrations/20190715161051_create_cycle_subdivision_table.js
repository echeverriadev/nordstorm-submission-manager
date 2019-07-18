exports.up = function(knex) {
  return knex.schema.createTable("cycle_subdivision", function(table) {
    table.bigIncrements("id");
    table.integer("_fk_cycle").unsigned();
    table.integer("_fk_subdivision");
    table
      .integer("submissions_limit")
      .notNullable()
      .defaultTo(50);
    table.foreign("_fk_cycle").references("cycle.__pk_cycle");
    table
      .foreign("_fk_subdivision")
      .references("subdivisions.__pk_subdivision");
    table.unique(["_fk_cycle", "_fk_subdivision"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("cycle_subdivision");
};
