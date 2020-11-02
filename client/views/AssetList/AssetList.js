import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { ItemTable } from '../components'
import { getFollowedArtists, getSavedTracks, getSavedAlbums, getHoldings, addHoldings } from 'gqlRequests'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}))

const assetTableConfig = {
  labels: [
    { name: 'name', direction: 'asc', format: 'avatar' },
    { name: 'followers' },
    { name: 'popularity' },
    { name: 'type', value: '__typename' },
    { name: 'held', format: 'date' }
  ]
}

const assetToolbarConfig = () => ({
  button: { text: 'hold assets', handler: addHoldings() },
  selectable: { text: 'show held', filter: 'held' },
  typeFilter: '__typename'
})

const getAssetsWithHoldingInfo = () => {
  const holdings = getHoldings()
  const assets = [...getFollowedArtists(), ...getSavedTracks(), ...getSavedAlbums()]
  const heldHoldings = holdings.filter(holding => !holding.dropped)
  const holdingsDict = Object.fromEntries(heldHoldings.map(holding => [holding.spotifyId, holding]))
  const heldAsset = asset => (holdingsDict[asset.id] ? +holdingsDict[asset.id].held : null)
  return assets.map(asset => ({ ...asset, held: heldAsset(asset) }))
}

const AssetList = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>
        <ItemTable
          items={getAssetsWithHoldingInfo()}
          itemTableConfig={assetTableConfig}
          itemToolbarConfig={assetToolbarConfig()}
        />
      </div>
    </div>
  )
}

export default AssetList
