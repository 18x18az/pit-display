import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
// function getApiHostname (): string {
//   const host = getHostname()
//   if (host === SECURE_HOST) {
//     return `https://${host}`
//   } else {
//     return `http://${host}:3002`
//   }
// }

function getHttpUrl (): string {
  const host = 'io.18x18az.org:1818'
  return `http://${host}/graphql`
}

const httpLink = new HttpLink({
  uri: getHttpUrl()
})

function getWsUrl (): string {
  const host = 'io.18x18az.org:1818'
  return `ws://${host}/graphql`
}

const wsLink = new GraphQLWsLink(createClient({
  url: getWsUrl()
}))

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    connectToDevTools: true
  })
}

export default createApolloClient
