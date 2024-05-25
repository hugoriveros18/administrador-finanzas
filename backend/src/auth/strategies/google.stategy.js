var { Strategy } = require('passport-google-oauth20');
const { config } = require('../../../config/config');
const { findOrCreateUser } = require('../../modules/utils');

const GoogleStrategy = new Strategy({
  clientID: config.google.clientId,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackUrl
},
function(accessToken, refreshToken, profile, cb) {
  
  const user = findOrCreateUser(profile._json, 'google')
  return cb(null, user)
})



module.exports = GoogleStrategy
