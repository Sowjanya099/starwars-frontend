import { createApp } from 'vue';
import App from './App.vue';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';


import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', 
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


createApp(App)
  .use(BootstrapVue3)  
  .provide(DefaultApolloClient, apolloClient)
  .mount('#app');