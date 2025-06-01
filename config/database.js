// Shared migration configuration
const migrations = {
  migrations: {
    directory: path.join(__rootDir, 'database/migrations'),
    tableName: 'migrations' // Knex generating default knex_migrations, so renaming to migrations
  }
};

// Database connection configurations
const connections = {
  mysql: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || "forge",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USERNAME || "forge",
      password: process.env.DB_PASSWORD || "forge",
      database: process.env.DB_DATABASE || "forge"
    },
    pool: { min: 0, max: 7 },
    ...migrations
  },

  pgsql: {
    client: 'pg',
    connection: {
      host: process.env.PGSQL_HOST,
      port: process.env.PGSQL_PORT || 5432,
      user: process.env.PGSQL_USERNAME,
      password: process.env.PGSQL_PASSWORD,
      database: process.env.PGSQL_DATABASE
    },
    pool: { min: 0, max: 7 },
    ...migrations
  },

  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: process.env.SQLITE_FILENAME || './database.sqlite'
    },
    useNullAsDefault: true,
    ...migrations
  }
};

// Determine which connection to use based on environment
const defaultConnection = process.env.DB_CONNECTION || 'mysql';

module.exports = {
  dbConnection: connections[defaultConnection]
};
