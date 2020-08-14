import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { ItemTable, ItemToolbar } from '../components'
import { getFollowedArtists, getHoldings, addHoldings } from 'gqlRequests'

const assetMetadata = [
  {
    label: 'Name',
    imageUrl: asset => asset.images.slice(-1)[0].url,
    direction: 'asc',
    format: 'avatar'
  },
  { label: 'Popularity' },
  { label: 'Followers' },
  { label: 'Bought', format: 'date' }
]

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}))

const addHoldingsToAssets = (assets, holdings) => {
  const holdingsDict = Object.fromEntries(holdings.map(holding => [holding.spotifyId, holding]))
  const heldAsset = asset => (holdingsDict[asset.id] ? holdingsDict[asset.id].createdAt : 0)
  return assets.map(asset => ({ ...asset, bought: heldAsset(asset) }))
}

const AssetList = () => {
  const classes = useStyles()

  const holdings = getHoldings()
  const artists = getFollowedArtists()
  const assetsWithHoldings = addHoldingsToAssets(artists, holdings)

  const [selectedItems, setSelectedItems] = useState([])

  const addHoldingsFromAssetIds = addHoldings()

  const holdAssets = () => {
    const assetIds = { artistIds: [] }
    for (const item of selectedItems) {
      const assetType = item.__typename.toLowerCase() + 'Ids'
      assetIds[assetType].push(item.id)
    }
    addHoldingsFromAssetIds({ variables: assetIds })
  }

  const holdAssetConfig = {
    text: 'Hold Assets',
    handler: holdAssets
  }

  return (
    <div className={classes.root}>
      <div>
        <ItemToolbar buttonConfig={holdAssetConfig} />
        <ItemTable
          items={assetsWithHoldings}
          itemTableMetadata={assetMetadata}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>
    </div>
  )
}

export default AssetList
