
exports.up = function(knex) {
  return knex.schema
    .createTable('loot', tbl => {
        tbl.increments('loot_id');
        tbl.string('name', 256).notNullable();
        tbl.integer('value', 256).notNullable();
        tbl.boolean('claimed').defaultTo(false).notNullable();
        tbl.integer('claim_id')
            .unsigned()
            .references('user_id')
            .inTable('users')
            .onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('loot')
};
