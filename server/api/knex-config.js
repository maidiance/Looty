const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '10.164.3.103',
        port: '3306',
        user: 'looty-dev',
        password: 'looty-dev',
        database: 'looty_dev'
    }
});

module.exports = knex;