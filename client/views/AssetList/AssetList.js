import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { ItemTable } from '../components'
import { getFollowedArtists } from 'gqlRequests'

const itemData = [
  {
    label: 'Name',
    value: asset => asset.name,
    imageUrl: asset => asset.images.slice(-1)[0].url,
    direction: 'asc',
    format: 'avatar'
  },
  { label: 'Popularity', value: asset => asset.popularity, direction: 'desc' },
  { label: 'Followers', value: asset => asset.followers, direction: 'desc' }
]

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}))

const AssetList = () => {
  const classes = useStyles()
  const assets = getFollowedArtists()

  return (
    <div className={classes.root}>
      <div>
        <ItemTable items={assets} itemData={itemData} />
      </div>
    </div>
  )
}

export default AssetList
