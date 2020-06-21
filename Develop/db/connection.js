const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({});

connection.connect();

module.exports = connection;
