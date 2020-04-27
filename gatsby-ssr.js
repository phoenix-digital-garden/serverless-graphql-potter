const React = require('react');
const fetch = require('isomorphic-fetch');
const {
    ApolloProvider,
    ApolloClient,
    HttpLink,
    InMemoryCache
} = require('@apollo/client');
// const { setContext } = require('apollo-link-context');
// const {createHttpLink } = require('apollo-link-http');

// const httpLink = createHttpLink({
//     uri: 'https://graphql.fauna.com/graphql',
//   });
  
//   const authLink = setContext((_, { headers }) => {
//     return {
//       headers: {
//         ...headers,
//         authorization: 'Bearer fnADqYPHlEACAG6J0UomodiHpy4WM5lcdJFMAqqH',
//       }
//     }
//   });
  
//   const client = new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache: new InMemoryCache()
//   });

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        // uri: 'https://graphql.fauna.com/graphql',
        uri: 'https://fauna-potter-test.netlify.app/.netlify/functions/graphql',
        // fetchOptions: {
        //     mode: 'no-cors',
        //   }
    }),
    fetch
});

export const wrapRootElement = ({element}) => (
<ApolloProvider client={client}>{element}</ApolloProvider>
)