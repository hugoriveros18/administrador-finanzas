const dotenv = require('dotenv')
dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || '4000',
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME
  },
  jwtSecret: process.env.JWT_SECRET,
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL
  },
}

module.exports = {
  config
}