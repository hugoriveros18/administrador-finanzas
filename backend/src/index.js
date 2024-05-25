const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { buildContext } = require('graphql-passport');
const cors = require('cors')
const http = require('http')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const passport = require('passport');
const jwt = require('jsonwebtoken')
const { typeDefs, resolvers } = require('./schema/index.js');
const { config } = require('../config/config.js');

require('./auth/index.js')

const app = express();

app.use(passport.initialize());

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

async function connectToServer() {

  await server.start();

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: ({ req, res }) => buildContext({ req, res })
    })
  );

  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  )

  app.get('/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    async (req, res) => {
      const user = await req.user
      if(user) {
        delete user.password
        delete user.googleId
        delete user.facebookId

        const payload = {
          userId: user.id,
          userRol: user.rol,
          provider: 'google'
        }
      
        const SECRET_KEY = config.jwtSecret
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
        res.send({ user, token })
      }
      console.log('req.user', await req.user)
    }
  )

  // app.get('/auth/facebook',
  //   passport.authenticate('facebook')
  // )

  // app.get('/auth/facebook/callback',
  //   passport.authenticate('facebook')
  // )

  

  const PORT = 4000

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));

  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

connectToServer()

