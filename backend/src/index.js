const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { typeDefs, resolvers } = require('./schema/index.js');


async function connectToServer() {

  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: ({ req }) => {
      const token = req.headers.authorization || null;

      return {
        token
      };
    }
  });

  console.log(`🚀 Server ready at: ${url}`);
}

connectToServer()

