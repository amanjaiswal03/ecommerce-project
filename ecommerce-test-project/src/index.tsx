import React from 'react'
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient(
  {
    uri: "https://graphql.datocms.com",
    cache: new InMemoryCache,
    headers: {
      "Authorization": "Bearer 08ffea4e4a4b480e268f9c309820b4"
    }
  }
);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client = {client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
  
);

