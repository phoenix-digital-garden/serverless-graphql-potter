const React = require('react');
const {
    ApolloProvider,
    ApolloClient,
    InMemoryCache
} = require('@apollo/client');
const { setContext } = require('apollo-link-context');
const {createHttpLink } = require('apollo-link-http');

const httpLink = createHttpLink({
    uri: 'https://graphql.fauna.com/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: 'Bearer fnADqYPHlEACAG6J0UomodiHpy4WM5lcdJFMAqqH',
      }
    }
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });


export const wrapRootElement = ({element}) => (
<ApolloProvider client={client}>{element}</ApolloProvider>
)