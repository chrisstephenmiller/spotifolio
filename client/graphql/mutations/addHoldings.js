import { useMutation, gql } from '@apollo/client'
import { getHoldingsQuery } from 'gqlRequests'

const addHoldingsMutation = gql`
  mutation($artistIds: [String] = [], $trackIds: [String] = [], $albumIds: [String] = []) {
    addHoldings(artistIds: $artistIds, trackIds: $trackIds, albumIds: $albumIds) {
      spotifyId
      asset {
        name
        popularity
        ... on Artist {
          followers
        }
      }
    }
  }
`

export const addHoldings = () => {
  const [addHoldingsFromAssetIds] = useMutation(addHoldingsMutation, { refetchQueries: [{ query: getHoldingsQuery }] })
  return addHoldingsFromAssetIds
}
