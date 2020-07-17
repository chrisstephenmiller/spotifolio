import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

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
  const assetDictEntries = data.getAssets.map(asset => [asset.spotifyId, asset])
  return loading || error ? null : Object.fromEntries(assetDictEntries)
}

export const Holdings = ({ holdings }) => {
  const assets = getAssets(holdings)
  return !assets ? null : (
    <div style={{ display: 'inline-flex' }}>
      <ol>
        {holdings.map(holding => {
          const asset = assets[holding.spotifyId]
          return (
            <p key={holding.spotifyId} style={{ display: 'flex', flexDirection: 'column' }}>
              <span>
                {holding.asset.name} - {holding.asset.__typename}
              </span>
              <span>- Bought At: {Date(holding.createdAt)}</span>
              <span>- Held Popularity: {holding.asset.popularity}</span>
              <span>- Current Popularity: {asset.popularity}</span>
            </p>
          )
        })}
      </ol>
    </div>
  )
}

export default Holdings
