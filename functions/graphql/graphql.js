const {ApolloServer} = require('apollo-server-lambda');
const { typeDefs } = require('./apollo-typeDefs');
const { client, query } = require('./db');

const server = new ApolloServer({
    typeDefs,
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

