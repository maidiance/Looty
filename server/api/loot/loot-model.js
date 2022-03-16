const db = require('../data/db-config');

module.exports = {
    get,
    getById,
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
        .select('loot_id', 'name', 'value', 'claimed', 'bagged', 'sold')
        .first();
    
}

async function insert(loots) {
    let toInsert = [];
    loots.forEach(item => {
        for(let i = 0; i < item.count; i++){
            let loot = {
                name: item.name,
                value: item.value,
            };
            toInsert.push(loot);
        }
    });
    await db('loot').insert(toInsert);
    return loots;
}

async function update(loot_id, changes) {
    await db('loot')
        .where('loot_id', loot_id)
        .update(changes);
    let result = await getById(loot_id);
    return result;
}

async function remove(loot_id) {
    let result = await getById(id);
    await db('loot').where('loot_id', loot_id).del();
    return result;
}