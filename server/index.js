// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var db         = require('./db.js')


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });
});

//add loot to table
router.post('/loot', (req, res) => {
    if ('loot' in req.body){
        var loot = req.body.loot;
    }
    if ('coin' in req.body){
        var coin = req.body.coin;
    }
    //start building SQL statement
    var sql_query = "insert into loot_register (name,value) values "
    loot.forEach((item) => {
        for (i = 0; i < item.count; i++){
            sql_query += "('" + item.name + "'," + item.value +"),"
        }
    })
    console.log(sql_query)
    db.query(sql_query.slice(0,-1), (err) => {
        if (err) throw err;
    })
    res.send("OK")
});

router.get('/loot', (req, res) => {
    var sql_query = "select * from loot_register";
    console.log(req.query);
    if ('filter' in req.query){
        switch (req.query.filter) {
            case 'claimed': sql_query += " where claimed_by is not null"; break;
            case 'unclaimed': sql_query += " where claimed_by is null"; break;
            case 'sold': sql_query += " where sold is true"; break;
            case 'unsold': sql_query += " where sold is false"; break;
            case 'bagged': sql_query += " where bagged is true"; break;
            case 'unbagged': sql_query += " where bagged is not true"; break;
            case 'distrobution': sql_query += " where bagged is not true and sold is not true and claimed_by is null"
        }
    }
    if ('sort' in req.query){
        if(["name","value","claimed_by"].includes(req.query.sort)){
            sql_query += " order by " + req.query.sort;
        }
    }
    console.log(sql_query + "|");
    db.query(sql_query, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening: ' + port);