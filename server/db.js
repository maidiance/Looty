const mysql = require('mysql')
const prod = false;

var db
if (prod)
{
	db = mysql.createConnection({
	host: "localhost",
	user: "looty",
	password: "looty-prod",
	database:"looty" 
	})
}
else 
{
	db = mysql.createConnection({
	host: "10.164.3.103",
	user: "looty-dev",
	password: "looty-dev",
	database:"looty_dev" 
	})
}

module.exports = db;