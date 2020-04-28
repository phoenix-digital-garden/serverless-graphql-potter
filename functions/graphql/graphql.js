// const {ApolloServer} = require('apollo-server-lambda');
// require('dotenv').config();
const {createHttpLink } = require('apollo-link-http');
const { ApolloServer, makeRemoteExecutableSchema, introspectSchema } = require('apollo-server-micro');
const fetch = require('isomorphic-fetch');

const link = createHttpLink({
    uri: 'https://graphql.fauna.com/graphql',
    fetch,
    headers: {
      Authorization: `Bearer ${process.env.CLIENT_KEY}`,
    },
  })

  const schema = makeRemoteExecutableSchema({
    schema: introspectSchema(link),
    link,
  })

const server = new ApolloServer({
    schema,
    introspection: true
});

exports.handler = server.createHandler({
    cors: {
        // origin: "*",
        origin: [
            'https://fauna-potter-test.netlify.com',
            'http://fauna-potter-test.netlify.com',
            'http://localhost',
        ],
        credentials: true
    }
});

