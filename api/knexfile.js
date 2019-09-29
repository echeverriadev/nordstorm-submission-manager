// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    acquireConnectionTimeout: process.env.KNEX_ACQUIRE_CONNECTION_TIME_OUT
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  rmsDevelopment: {
    client: process.env.RMS_DB_CLIENT,
    connection: {
      host: process.env.RMS_DB_HOST,
      database: process.env.RMS_DB_NAME,
      user: process.env.RMS_DB_USER,
      password: process.env.RMS_DB_PASS
    },
    acquireConnectionTimeout: process.env.KNEX_ACQUIRE_CONNECTION_TIME_OUT
  }
};
