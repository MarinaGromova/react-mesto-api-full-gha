require('dotenv').config();

const config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/mestodb',
};

module.exports = { config };
