import React from 'react'

export const FollowedAssets = ({ assets, holdings, addHolding }) => {
  const holdAsset = asset => {
    const assetType = `${asset.__typename.toLowerCase() + 'Ids'}`
    const variables = { [assetType]: asset.spotifyId }
    addHolding({ variables })
  }

  return (
    <div style={{ display: 'inline-flex' }}>
      <ol>
        {assets.map(asset => {
          const heldasset = holdings.find(holding => holding.spotifyId === asset.spotifyId)
          return (
            <p
              key={asset.spotifyId}
              onClick={() => holdAsset(asset)}
              style={{ display: 'flex', flexDirection: 'column', color: heldasset ? 'green' : 'red' }}
            >
              <span> {asset.name} </span>
              <span>- Popularity: {asset.popularity}</span>
            </p>
          )
        })}
      </ol>
    </div>
  )
}

export default FollowedAssets
