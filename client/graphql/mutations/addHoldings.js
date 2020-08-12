import { useMutation, gql } from '@apollo/client'

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
  const { data } = useMutation(addHoldingsMutation)
  return data ? data.addHoldings : []
}
