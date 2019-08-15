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
    <ApolloProvider id="test" client={client}>
      <div id="wrapper">
        <div id="main">
          <h1>Twitch Streamer Trading Cards</h1>
          <Card />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
