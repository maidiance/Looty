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
    return db('users').where(filter).first();
}

async function insert(user) {
    await db('users').insert(user);
    return findBy({username: user.username});
}