const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: { directory: './api/data/migrations' },
  seeds: { directory: './api/data/seeds' },
  pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
}

module.exports = {
  development: {
    ...sharedConfig,
    connection:{ filename: './api/data/looty.db3' }
  },
  testing: {
    ...sharedConfig,
    connection: { filename: './api/data/lootyTest.db3' }
  }
};