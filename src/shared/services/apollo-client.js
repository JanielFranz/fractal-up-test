import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
const API_BASE_URL = 'https://countries.trevorblades.com';

const httpLink = new HttpLink({
    uri: API_BASE_URL
})

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default apolloClient;