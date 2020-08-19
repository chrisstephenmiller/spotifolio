import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { ItemTable } from '../components'
import { getHoldings, dropHoldings } from 'gqlRequests'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}))

const holdingTableConfig = {
  labels: [
    { name: 'Name', direction: 'asc', format: 'avatar' },
    { name: 'Performance', format: 'percent' },
    { name: 'Popularity', format: 'percent' },
    { name: 'Followers', format: 'percent' },
    { name: 'Type', direction: 'asc' },
    { name: 'Held', format: 'date' },
    { name: 'Dropped', format: 'date' }
  ],
  button: { text: 'Drop Holdings', handler: '' }
}

const HoldingList = () => {
  const classes = useStyles()
  const holdings = getHoldings()

  holdingTableConfig.button.handler = dropHoldings()

  return (
    <div className={classes.root}>
      <div>
        <ItemTable items={holdings} itemTableConfig={holdingTableConfig} />
      </div>
    </div>
  )
}

export default HoldingList
