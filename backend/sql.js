require('dotenv').config();

let mysql = require('mysql');
const {SQLFields, SQLTables} = require("./lookup-table.js");
const {SensorName} = require("./lookup-table.js");

let con = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB
});

con.connect(function(err) {
    if (err) {
        console.log("Failed to connect");
        throw err;
    }
    console.log("Connected to database");
});

module.exports = con;
