const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['auth-token'];
  }
  return token;
};

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: config.jwtSecret
}
// const options = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: config.jwtSecret
// }

const JwtStrategy = new Strategy(options, (payload, done) => {
  done(null, payload)
})

module.exports = JwtStrategy