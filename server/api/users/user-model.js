const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findBy,
    insert,
    update,
    remove
};

function find() {
    return db('users');
}

function findById(id) {
    return db('users').where('user_id', id).first();
}

function findBy(filter) {
    return db('users').where(filter);
}

async function insert(user) {
    let toInsert = {
        username: user.username,
        password: user.password
    };
    if(user.dm) {
        toInsert.role = 'dm';
    }
    await db('users').insert(toInsert);
    let [result] = await findBy({username: user.username});
    return result;
}

async function update(user_id, changes) {
    await db('users')
        .where('user_id', user_id)
        .update(changes);
    let result = await findById(user_id);
    return result;
}

async function remove(user_id) {
    let result = await findById(user_id);
    await db('users').where('user_id', user_id).del();
    return result;
}