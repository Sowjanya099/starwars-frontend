import { createApp } from 'vue';
import App from './App.vue';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // <-- this is correct if your backend exposes /graphql
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .mount('#app');