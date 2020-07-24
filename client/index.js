import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { ProvideAuth } from './auth'
import { Router } from 'react-router-dom'
import history from './history'
import App from './app'
import './socket'

const client = new ApolloClient()

ReactDOM.render(
  <ApolloProvider client={client}>
    <ProvideAuth>
      <Router history={history}>
        <App />
      </Router>
    </ProvideAuth>
  </ApolloProvider>,
  document.getElementById('app')
)
