const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findBy,
    insert
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
    await db('users').insert(user);
    let [result] = await findBy({username: user.username});
    return result;
}