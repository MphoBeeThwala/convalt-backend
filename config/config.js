require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './backend/database.sqlite',
    logging: false
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  },
  production: {
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    logging: false
  }
};
