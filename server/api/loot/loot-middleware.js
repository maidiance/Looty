const Loots = require('./loot-model');

function validateLoot(req, res, next) {
    const loots = req.body;
    let isValid = true;
    let toInsert = [];
    loots.forEach(item => {
        if(!item.count || item.count < 1){
            isValid = false;
        }
    });
    if(isValid){
        next();
    } else {
        res.status(400).json({message: 'invalid count detected'});
    }
}

module.exports = {
    validateLoot
}