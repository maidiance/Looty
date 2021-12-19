const mysql = require('mysql')
const db = mysql.createConnection({
host: "10.164.3.103",
user: "express",
password: "express",
database:"express" 
})

db.connect()

// console.log(db)

module.exports = db;
