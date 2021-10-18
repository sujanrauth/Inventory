/**
 * Development Environment Settings
 */

module.exports = {
  port: process.env.PORT || 5200,
  prefix: process.env.PREFIX || '/api',
  mongoDB: {
    databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/inventory',
  },
};
