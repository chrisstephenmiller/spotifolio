import React from 'react'

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
const client = new ApolloClient({ uri: '/graphql', cache: new InMemoryCache() })

import { ProvideAuth } from './auth'

import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'

import { Router } from 'react-router-dom'
import history from './history'

import Routes from './routes'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ProvideAuth>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <Routes />
          </Router>
        </ThemeProvider>
      </ProvideAuth>
    </ApolloProvider>
  )
}

export default App
