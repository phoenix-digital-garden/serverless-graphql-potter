// const {ApolloServer} = require('apollo-server-lambda');
const { createHttpLink } = require('apollo-link-http');
const { ApolloServer, makeRemoteExecutableSchema, introspectSchema } = require('apollo-server-micro');
const { client, query } = require('./db');
const fetch = require('isomorphic-fetch');


const link = createHttpLink({
    uri: 'https://graphql.fauna.com/graphql',
    fetch,
    headers: {
      Authorization: `Bearer ${process.env.CLIENT_KEY}`,
    },
  });

const schema = makeRemoteExecutableSchema({
    schema: introspectSchema(link),
    link
});


const server = new ApolloServer({
    schema,
    context: ({event}) => {
        return {client, query, headers: event.headers};
    },
    playground: true,
    introspection: true
});

exports.handler = server.createHandler({
    cors: {
        origin: "*",
        // origin: [
        //     'https://fauna-potter-test.netlify.com',
        //     'http://fauna-potter-test.netlify.com',
        //     'http://localhost',
        // ],
        credentials: true
    }
});

