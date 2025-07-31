import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'
import Cookies from 'js-cookie'

import './index.css'

import App from './App.tsx'

import { setContext } from '@apollo/client/link/context'
import setupInterceptors from './interceptors'

const BASE_URL = import.meta.env.APP_BASE_URL
const GRAPHQL_ENDPOINT = `${BASE_URL}/graphql`

const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT })

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('XSRF-TOKEN')

  return {
    credentials: 'include',
    headers: {
      ...headers,
      'X-XSRF-TOKEN': token ?? ''
    }
  }
})

const client = new ApolloClient({
  credentials: 'include',
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  connectToDevTools: true,
  defaultOptions: {
    query: {
      errorPolicy: 'all'
    },
    mutate: {
      errorPolicy: 'all'
    }
  }
})

setupInterceptors()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
)
