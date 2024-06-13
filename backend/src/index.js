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
const cookieParser = require('cookie-parser');
const { validarJwt } = require('./modules/utils.js');

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

  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  }

  app.use(
    '/graphql',
    cors(corsOptions),
    cookieParser(),
    express.json(),
    expressMiddleware(server, {
      context: ({ req, res }) => buildContext({ req, res })
    })
  );

  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  )

  app.get('/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:3000/login'}),
    async (req, res) => {
      const user = await req.user
      if(user) {
        try {
          const payload = {
            userId: user.id,
            userRol: user.rol
          }
        
          const SECRET_KEY = config.jwtSecret
          const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
  
          const UNA_DIA_EN_MS = 86400000
  
          res.cookie('auth-token', token, {
            httpOnly: true,
            secure: false,
            maxAge: UNA_DIA_EN_MS,
          })
  
          res.redirect('http://localhost:3000')
        } catch (error) {
          console.log('error', error)
          res.redirect('http://localhost:3000/login')
        }
      } else {
        res.redirect('http://localhost:3000/login')
      }
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

