import React from 'react';
import Card from './components/Card'
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
// import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Twitch Profile Scraper</h1>
        <Card />
      </div>
    </ApolloProvider>
  );
}

export default App;
