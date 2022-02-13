const express = require('express');
const Loots = require('./loot-model.js');
const { validateLoot } = require('./loot-middleware');
const router = express.Router();

router.get('/', async (req, res) => {
    const loots = await Loots.get();
    console.log(loots);
    if (loots == null) {
        res.status(404).json({message: 'missing loots'});
    } else {
        res.status(200).json(loots);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const loot = await Loots.getById(id);
    if(loot == null || loot.length < 1){
        res.status(404).json({message: `loot ${id} not found`});
    } else {
        res.status(200).json(loot[0]);
    }
});

router.post('/', validateLoot, async (req, res) => {
    const loots = req.body;
    const updated = await Loots.insert(loots);
    if (updated[0] > 0) {
        res.status(201).json(loots);
    } else {
        res.status(500).json({message: 'failed to post'});
    }
});

module.exports = router;