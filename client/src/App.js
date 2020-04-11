import React from 'react';
import BooksList from './components/booksList';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
    <div>
      <h1> Ghanta </h1>
      <BooksList />
    </div>
    </ApolloProvider>
  );
}

export default App;
