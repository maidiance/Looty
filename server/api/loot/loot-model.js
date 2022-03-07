const knex = require('../knex-config');

module.exports = {
    get,
    getById,
    insert,
    update,
    remove
}

function get() {
    return knex.select().from('loot_register')
        .then(resp => {
            return resp;
        })
        .catch((err) => { console.log( err); throw err })
}

function getById(id) {
    return knex.select().from('loot_register')
        .where({loot_id: id})
        .then(resp => {
            return resp;
        })
        .catch((err) => { console.log( err); throw err })
}

function insert(loots) {
    let toInsert = [];
    loots.forEach(item => {
        for(let i = 0; i < item.count; i++){
            toInsert.push({
                name: item.name,
                value: item.value,
            });
        }
    });
    return knex.insert(toInsert).into('loot_register')
        .then(resp => {
            return resp;
        })
        .catch((err) => { console.log( err); throw err })
}

async function update(id, changes) {
    await knex('loot_register')
        .where({loot_id: id})
        .update(changes);
    let result = await getById(id);
    return result;
}

async function remove(id) {
    let result = await getById(id);
    await knex('loot_register').where({loot_id: id}).del();
    return result;
}