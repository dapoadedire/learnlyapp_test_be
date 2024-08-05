require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  development: {
    username: process.env.DB_USERNAME_DEV || 'default_username',
    password: process.env.DB_PASSWORD_DEV || 'default_password',
    database: process.env.DB_DATABASE_DEV || 'default_database',
    host: process.env.DB_HOST_DEV || 'default_host',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME_TEST || 'root',
    password: process.env.DB_PASSWORD_TEST || null,
    database: process.env.DB_DATABASE_TEST || 'database_test',
    host: process.env.DB_HOST_TEST || '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USERNAME_PROD || 'root',
    password: process.env.DB_PASSWORD_PROD || null,
    database: process.env.DB_DATABASE_PROD || 'database_production',
    host: process.env.DB_HOST_PROD || '127.0.0.1',
    dialect: 'mysql',
  }
};