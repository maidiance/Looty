const Loots = require('./loot-model');

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
    const loots = req.body;
    loots.forEach(item => {
        if(!item.count || item.count < 1){
            res.status(400).json({message: 'invalid count detected'});
        } else if (!item.name || !item.name.trim() || item.name.length >= 256){
            res.status(400).json({message: 'invalid item name'});
        } else if (!item.value || typeof(item.value) != 'Number' || item.value < 0){
            res.status(400).json({message: 'invalid value'});
        }
    });
    next();
}

module.exports = {
    validateLootId,
    validateLoot
}