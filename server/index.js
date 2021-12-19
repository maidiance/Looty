const express = require('express');
const db = require('./db')
const cors = require('cors')

const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json())

console.log("Depends loaded")

// Route to get all posts
app.get("/api/get", (req,res)=>{
db.query("SELECT * FROM posts", (err,result)=>{
    if(err) {
    console.log(err)
    } 
res.send(result)
});   });

// arbitrary DB access

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


app.get("/api/db", (req,res) => {
console.log("----------------------------------")
console.log(req);
console.log("----------------------------------")
console.log(typeof(req.query.sql),req.query.sql)
sql_query = req.query.sql.replace(/-/g, ' ');
console.log(sql_query)

db.query(sql_query, (err,result) => {
	if(err) {
		console.log(err)
	}
res.send(result)
}); });

// Route to get one post
app.get("/api/getFromId/:id", (req,res)=>{

const id = req.params.id;
 db.query("SELECT * FROM posts WHERE id = ?", id, 
 (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
    });   });

// Route for creating the post
app.post('/api/create', (req,res)=> {

const username = req.body.userName;
const title = req.body.title;
const text = req.body.text;

db.query("INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)",[title,text,username], (err,result)=>{
   if(err) {
   console.log(err)
   } 
   console.log(result)
});   })

// Route to like a post
app.post('/api/like/:id',(req,res)=>{

const id = req.params.id;
db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
    if(err) {
   console.log(err)   } 
   console.log(result)
    });    
});

// Route to delete a post

app.delete('/api/delete/:id',(req,res)=>{
const id = req.params.id;

db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
if(err) {
console.log(err)
        } }) })

app.listen(PORT, ()=>{
    console.log("Listening")
})
