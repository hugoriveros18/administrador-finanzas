var { Strategy } = require('passport-facebook');
const { config } = require('../../../config/config');
const { findOrCreateUser } = require('../../modules/utils');

const FacebookStrategy = new Strategy({
  clientID: config.facebook.clientId,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackUrl,
  profileFields: ['id', 'email', 'first_name', 'last_name']
},
function(accessToken, refreshToken, profile, cb) {
  
  // const user = findOrCreateUser(profile._json, 'google')
  console.log('profile', profile) // SE REQUIERE PROPORCIONAR UNA URL DE PRIVACIDAD EN LA CONFIGURACIÓN DE LA APLICACIÓN DE FACEBOOK PARA OBTENER EL EMAIL DEL USUARIO
  // return cb(null, user)
})



module.exports = FacebookStrategy
