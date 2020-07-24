import React from 'react'

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
const client = new ApolloClient({ uri: '/graphql', cache: new InMemoryCache() })

import { ProvideAuth } from './auth'

import { Router } from 'react-router-dom'
import history from './history'

import { Navbar } from './components'
import Routes from './routes'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ProvideAuth>
        <Router history={history}>
          <Navbar />
          <Routes />
        </Router>
      </ProvideAuth>
    </ApolloProvider>
  )
}

export default App
