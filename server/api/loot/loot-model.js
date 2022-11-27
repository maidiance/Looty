const db = require('../data/db-config');

module.exports = {
    get,
    getById,
    getByFilter,
    insert,
    update,
    remove
}

function get() {
    return db('loot');
}

function getById(loot_id) {
    return db('loot')
        .where('loot_id', loot_id)
        .select('loot_id', 'name', 'value', 'claimed', 'claim_id')
        .first();
    
}

function getByFilter(filter) {
    return db('loot')
        .where(filter)
        .select('loot_id', 'name', 'value', 'claimed', 'claim_id')
}

async function insert(loot){
    console.log(loot);
    const [id] = await db('loot')
        .insert({
            name: loot.name,
            value: loot.value,
            claimed: loot.claimed || false
        });
    return getById(id);
}

async function update(loot_id, changes) {
    await db('loot')
        .where('loot_id', loot_id)
        .update(changes);
    let result = await getById(loot_id);
    return result;
}

async function remove(loot_id) {
    let result = await getById(loot_id);
    await db('loot').where('loot_id', loot_id).del();
    return result;
}