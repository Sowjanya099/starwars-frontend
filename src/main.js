import { createApp } from 'vue';
import App from './App.vue';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';

// Import BootstrapVue 3 and Bootstrap CSS
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // <-- this is correct if your backend exposes /graphql
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// Create the Vue app and use BootstrapVue 3
createApp(App)
  .use(BootstrapVue3)  // Use BootstrapVue 3 for Vue 3 compatibility
  .provide(DefaultApolloClient, apolloClient)
  .mount('#app');