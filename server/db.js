const mysql = require('mysql')
const prod = true;

let db
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
	host: "localhost",
	user: "looty-dev",
	password: "looty-dev",
	database:"looty-dev" 
	})
}


db.connect()

console.log(db)

module.exports = db;
