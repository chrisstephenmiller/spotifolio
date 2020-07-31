import React from 'react'
import { useQuery, gql } from '@apollo/client'

const assetsQuery = gql`
  query($artistIds: [String] = [], $trackIds: [String] = [], $albumIds: [String] = []) {
    getAssets(artistIds: $artistIds, trackIds: $trackIds, albumIds: $albumIds) {
      name
      popularity
      spotifyId
    }
  }
`

const getAssetQueryVariables = holdings => {
  const variables = { artistIds: [], trackIds: [], albumIds: [] }
  holdings.forEach(holding => {
    const assetType = `${holding.asset.__typename.toLowerCase() + 'Ids'}`
    variables[assetType].push(holding.spotifyId)
  })
  return variables
}

const getAssets = holdings => {
  const variables = getAssetQueryVariables(holdings)
  const { loading, error, data } = useQuery(assetsQuery, { variables })
  return loading || error ? null : Object.fromEntries(data.getAssets.map(asset => [asset.spotifyId, asset]))
}

const Holdings = ({ holdings }) => {
  const assets = getAssets(holdings)
  return !assets ? null : (
    <div style={{ display: 'inline-flex' }}>
      <ol>
        {holdings.map(holding => {
          const asset = assets[holding.spotifyId]
          const boughtAt = new Date(+holding.createdAt).toLocaleDateString()
          const delta = holding.asset.popularity < asset.popularity ? 'green' : 'red'
          return (
            <p key={holding.spotifyId} style={{ display: 'flex', flexDirection: 'column', color: delta }}>
              <span>
                {holding.asset.name} - {holding.asset.__typename}
              </span>
              <span>- Bought At: {boughtAt}</span>
              <span>- Held Popularity: {holding.asset.popularity}</span>
              <span>- Current Popularity: {asset.popularity}</span>
              <span>- Id: {holding.spotifyId}</span>
            </p>
          )
        })}
      </ol>
    </div>
  )
}

export default Holdings
