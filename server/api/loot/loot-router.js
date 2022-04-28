const express = require('express');
const Loots = require('./loot-model.js');
const { validateLootId, validateLoot } = require('./loot-middleware');
const { restricted, only} = require('../middleware/restricted');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.query && req.query.undistributed){
        Loots.getByFilter({claimed: null, bagged: false, sold: false})
            .then(loot => {
                res.status(200).json(loot);
            })
            .catch((err) => {
                res.status(500).json({message: 'could not get undistributed loot'});
            })
    } else {
        Loots.get()
            .then(loot => {
                res.status(200).json(loot);
            })
            .catch(() => {
                res.status(500).json({message: 'could not get all loot'});
            })
    }
});

router.get('/:id', validateLootId, (req, res) => {
    const { id } = req.params;
    Loots.getById(id)
        .then(loot => {
            res.status(200).json(loot);
        })
        .catch(() => {
            res.status(500).json({message: 'could not get loot by id'})
        })
});

router.post('/', restricted, only('dm'), validateLoot, (req, res) => {
    let loots = [];
    if(req.body.count == 1){
        loots = req.body;
    } else {
        for(let i = 0; i < req.body.count; i++) {
            loots.push({
                name: req.body.name,
                value: req.body.value
            })
        }
    }
    Loots.insert(loots)
        .then(loot => {
            res.status(201).json(loot);
        })
        .catch(() => {
            res.status(500).json({message: 'could not post loot'});
        })

});

router.put('/:id', restricted, only('dm'), validateLootId, validateLoot, (req, res) => {
    const { id } = req.params;
    Loots.update(id, req.body)
        .then(loot => {
            res.status(200).json(loot);
        })
        .catch(() => {
            res.status(500).json({message: 'could not put loot'});
        })
});

router.delete('/:id', restricted, only('dm'), validateLootId, (req, res) => {
    const { id } = req.params;
    Loots.remove(id)
        .then(loot => {
            res.status(200).json(loot);
        })
        .catch(() => {
            res.status(500).json({message: 'could not delete loot'});
        })
});

module.exports = router;