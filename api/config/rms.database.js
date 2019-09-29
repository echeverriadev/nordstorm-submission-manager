"use strict";

const env = "rmsDevelopment";
const knexfile = require("../knexfile");
const knex = require("knex")(knexfile[env]);

module.exports = knex;
