const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost",
user: "express",
password: "express",
database:"express" 
})

module.exports = db;
