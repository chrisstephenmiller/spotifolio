import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { ItemTable } from '../components'
import { getHoldings } from 'gqlRequests'

const holdTableConfig = {
  labels: [
    {
      name: 'Name',
      value: holding => holding.asset.name,
      imageUrl: holding => holding.asset.images.slice(-1)[0].url,
      direction: 'asc',
      format: 'avatar'
    },
    { name: 'Performance', format: 'percent' },
    { name: 'Popularity', format: 'percent' },
    { name: 'Followers', format: 'percent' },
    { name: 'Type', value: holding => holding.asset.__typename, direction: 'asc' },
    { name: 'Bought', value: holding => holding.createdAt, format: 'date' },
    { name: 'Sold', value: holding => holding.destroyedAt, format: 'date' }
  ]
}
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}))

const HoldingList = () => {
  const classes = useStyles()
  const holdings = getHoldings()

  const [selectedItems, setSelectedItems] = useState([])

  return (
    <div className={classes.root}>
      <div>
        <ItemTable
          items={holdings}
          itemTableConfig={holdTableConfig}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>
    </div>
  )
}

export default HoldingList
