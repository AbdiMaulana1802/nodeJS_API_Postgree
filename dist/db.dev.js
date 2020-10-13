"use strict";

var Pool = require("pg").Pool;

var pool = new Pool({
  user: "postgres",
  password: "180203",
  database: "todo_database",
  host: "localhost",
  port: 5432
});
module.exports = pool;