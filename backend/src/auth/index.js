const passport = require('passport');
const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');
const GoogleStrategy = require('./strategies/google.stategy');
// const FacebookStrategy = require('./strategies/facebook.strategy');

passport.use(LocalStrategy)
passport.use(JwtStrategy)
passport.use(GoogleStrategy)
// passport.use(FacebookStrategy)