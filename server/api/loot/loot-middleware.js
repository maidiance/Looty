const Loots = require('./loot-model');
const Users = require('../users/user-model');

function validateLootId (req, res, next) {
    const id = req.params.id;
    Loots.getById(id)
        .then(loot => {
            if(loot == null) {
                res.status(404).json({message: `loot ${id} not found`});
            } else {
                next();
            }
        })
        .catch(() => {
            res.status(500).json({message: 'could not validate loot id'});
        })
}

function validateLoot (req, res, next) {
    const loot = req.body;
    if (!loot.name || !loot.name.trim() || loot.name.length >= 256){
        res.status(400).json({message: 'invalid item name'});
    } else if (!loot.value || typeof(loot.value) != 'number' || loot.value < 0){
        res.status(400).json({message: 'invalid item value'});
    } else if (loot.claimed == 1) {
        Users.findById(loot.claim_id)
        .then(user => {
            if(user == null) {
                res.status(404).json({message: `user ${loot.claim_id} not found`});
            } else {
                next();
            }
        })
        .catch(() => {
            res.status(500).json({message: 'could not validate user id'});
        })
    } else {
        next();
    }
}

module.exports = {
    validateLootId,
    validateLoot
}