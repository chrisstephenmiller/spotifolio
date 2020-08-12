import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { ItemTable, ItemToolbar } from '../components'
import { getFollowedArtists, getHoldings } from 'gqlRequests'

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
  const assetsWithHoldings = addHoldingsToAssets(getFollowedArtists(), getHoldings())

  return (
    <div className={classes.root}>
      <div>
        <ItemToolbar />
        <ItemTable items={assetsWithHoldings} itemsMetadata={assetMetadata} />
      </div>
    </div>
  )
}

export default AssetList
