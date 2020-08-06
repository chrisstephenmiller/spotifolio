import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { ItemTable } from '../components'
import { getHoldings } from 'gqlRequests'

const itemData = [
  {
    label: 'Name',
    value: holding => holding.asset.name,
    imageUrl: holding => holding.asset.images.slice(-1)[0].url,
    direction: 'asc',
    format: 'avatar'
  },
  { label: 'Performance', value: holding => holding.performancePct, direction: 'desc', format: 'percent' },
  { label: 'Popularity', value: holding => holding.popularityPct, direction: 'desc', format: 'percent' },
  { label: 'Followers', value: holding => holding.followersPct, direction: 'desc', format: 'percent' },
  { label: 'Type', value: holding => holding.asset.__typename, direction: 'asc' },
  { label: 'Bought', value: holding => holding.createdAt, direction: 'desc', format: 'date' },
  { label: 'Sold', value: holding => holding.destroyedAt, direction: 'desc', format: 'date' }
]

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}))

const HoldingList = () => {
  const classes = useStyles()
  const holdings = getHoldings()

  return (
    <div className={classes.root}>
      <div>
        <ItemTable items={holdings} itemData={itemData} />
      </div>
    </div>
  )
}

export default HoldingList
