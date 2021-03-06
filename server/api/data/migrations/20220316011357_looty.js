
exports.up = function(knex) {
  return knex.schema
    .createTable('loot', tbl => {
        tbl.increments('loot_id');
        tbl.string('name', 256).notNullable();
        tbl.integer('value', 256).notNullable();
        tbl.integer('claimed')
            .unsigned()
            .references('user_id')
            .inTable('users')
            .onDelete('CASCADE');
        tbl.boolean('bagged').defaultTo(false);
        tbl.boolean('sold').defaultTo(false);
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('loot')
};
