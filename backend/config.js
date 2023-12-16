require('dotenv').config();

const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/mestodb',
  // JWT: process.env.JWT_SECRET,
  // NODE_ENV: process.env.NODE_ENV,
};

module.exports = { config };
