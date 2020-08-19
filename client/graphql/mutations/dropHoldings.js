import { useMutation, gql } from '@apollo/client'
import { getHoldingsQuery } from 'gqlRequests'

const dropHoldingsMutation = gql`
  mutation($holdingIds: [Int] = []) {
    dropHoldings(holdingIds: $holdingIds) {
      spotifyId
      asset {
        name
        popularity
        followers
      }
    }
  }
`

export const dropHoldings = () => {
  const [dropHoldingsHook] = useMutation(dropHoldingsMutation, { refetchQueries: [{ query: getHoldingsQuery }] })
  return holdings => dropHoldingsHook({ variables: { holdingIds: holdings.map(holding => holding.id) } })
}
