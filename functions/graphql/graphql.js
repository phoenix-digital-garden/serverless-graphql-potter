// const {ApolloServer} = require('apollo-server-lambda');
require('dotenv').config();
const { client, query } = require('./db');
const {createHttpLink } = require('apollo-link-http');
const { ApolloServer, makeRemoteExecutableSchema, introspectSchema } = require('apollo-server-micro');

const link = createHttpLink({
    uri: 'https://graphql.fauna.com/graphql',
    fetch,
    headers: {
      Authorization: `Bearer fnADqYPHlEACAG6J0UomodiHpy4WM5lcdJFMAqqH`,
    },
  })

  const schema = makeRemoteExecutableSchema({
    schema: introspectSchema(link),
    link,
  })

const server = new ApolloServer({
    schema,
    // context: ({event}) => {
    //     console.log({event})
    //     return {client, query, headers: event.headers};
    // },
    // playground: true,
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

