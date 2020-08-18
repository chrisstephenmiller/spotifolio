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
  const [holdAssets] = useMutation(addHoldingsMutation, { refetchQueries: [{ query: getHoldingsQuery }] })
  return assets => {
    const assetIds = { artistIds: [], trackIds: [], albumIds: [] }
    for (const asset of assets) {
      const assetType = asset.__typename.toLowerCase() + 'Ids'
      assetIds[assetType].push(asset.id)
    }
    return holdAssets({ variables: assetIds })
  }
}
