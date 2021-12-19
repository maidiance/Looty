const express = require('express');
const db = require('./db')
const cors = require('cors')

const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json())

console.log("Depends loaded")


// getting unclaimed loot
app.get("/api/unclaimed", (req,res) => {
// console.log("----------------------------------")
// console.log(req);
// console.log("----------------------------------")
sql_query="select * from loot_register where claimed_by='none' ";
console.log(sql_query);
db.query(sql_query, (err,result) => {
        if(err) {
                console.log(err)
        }
res.send(result)
}); });

// post new loot
app.post("/api/newLoot", (req, res) => {
    console.log(req);
    sql_query = `insert into loot_register (name, value, count) values ('${req.body.name}', ${req.body.value}, ${req.body.count})`;
    console.log(sql_query);
    db.query(sql_query, (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    });
})

// IMPORTANT!! DO NOT DELETE 
app.listen(PORT, ()=>{
    console.log("Listening")
})
