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
    sql_query="select * from loot_register where claimed_by='none' ";
    console.log('unclaimed loot', sql_query);
    db.query(sql_query, (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    });
})

// getting all loot
app.get("/api/loot", (req, res) => {
    sql_query = "select * from loot_register";
    console.log('get all loot', sql_query);
    db.query(sql_query, (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    });
})

// post new loot
app.post("/api/newLoot", (req, res) => {
    sql_query = `insert into loot_register (name, value ) values ('${req.body.name}', ${req.body.value})`;
    console.log('post new loot', sql_query);
    db.query(sql_query, (err, result) => {
        if(err) {
            console.log(err);
        }
        console.log("post new loot result", result);
        res.send(result);
    });
})

// delete loot of id
app.post("/api/deleteLoot", (req, res) => {
    sql_query = `delete from loot_register where id=${req.body.id}`;
    console.log('delete query: ', sql_query);
    db.query(sql_query, (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    })
})

// update loot of id
app.post("/api/updateLoot", (req, res) => {
    sql_query = `update loot_register set name='${req.body.name}', value=${req.body.value} where id=${req.body.id}`
    console.log('update query', sql_query);
    db.query(sql_query, (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    })
})

// IMPORTANT!! DO NOT DELETE 
app.listen(PORT, ()=>{
    console.log("Listening")
})
