import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { ItemTable } from '../components'
import { getHoldings } from 'gqlRequests'

const holdingMetadata = [
  {
    label: 'Name',
    value: holding => holding.asset.name,
    imageUrl: holding => holding.asset.images.slice(-1)[0].url,
    direction: 'asc',
    format: 'avatar'
  },
  { label: 'Performance', format: 'percent' },
  { label: 'Popularity', format: 'percent' },
  { label: 'Followers', format: 'percent' },
  { label: 'Type', value: holding => holding.asset.__typename, direction: 'asc' },
  { label: 'Bought', value: holding => holding.createdAt, format: 'date' },
  { label: 'Sold', value: holding => holding.destroyedAt, format: 'date' }
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
        <ItemTable items={holdings} itemsMetadata={holdingMetadata} />
      </div>
    </div>
  )
}

export default HoldingList
