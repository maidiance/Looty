
exports.up = async function (knex) {
    await knex.schema
        .createTable('users', (users) => {
            users.increments('user_id')
            users.string('username', 128).notNullable().unique()
            users.string('password', 256).notNullable()
            users.string('role', 128);
        })
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('users');
};
