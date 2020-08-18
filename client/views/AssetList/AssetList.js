import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { ItemTable } from '../components'
import { getFollowedArtists, getHoldings, addHoldings } from 'gqlRequests'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}))

const assetTableConfig = {
  labels: [
    {
      name: 'Name',
      imageUrl: asset => asset.images.slice(-1)[0].url,
      direction: 'asc',
      format: 'avatar'
    },
    { name: 'Popularity' },
    { name: 'Followers' },
    { name: 'Bought', format: 'date' }
  ],
  button: { text: 'Hold Assets' }
}

const addHoldingInfoToAssets = (assets, holdings) => {
  const currentHoldings = holdings.filter(holding => !holding.destroyedAt)
  const holdingsDict = Object.fromEntries(currentHoldings.map(holding => [holding.spotifyId, holding]))
  return assets.map(asset => (holdingsDict[asset.id] ? { ...asset, bought: holdingsDict[asset.id].createdAt } : asset))
}

const AssetList = () => {
  const classes = useStyles()

  const holdings = getHoldings()
  const artists = getFollowedArtists()
  const artistsWithHoldingInfo = addHoldingInfoToAssets(artists, holdings)

  assetTableConfig.button.handler = addHoldings()

  return (
    <div className={classes.root}>
      <div>
        <ItemTable items={artistsWithHoldingInfo} itemTableConfig={assetTableConfig} />
      </div>
    </div>
  )
}

export default AssetList
