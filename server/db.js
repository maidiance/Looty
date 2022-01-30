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

console.log("-------------")
console.log("Creating connection.")
db.connect(function(err) {
	if (err) {
		console.log(err.stack);
	}
})
console.log("----------")
console.log("Logging DB object")

console.log(db)

module.exports = db;