import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { ItemTable } from '../components'
import { getHoldings, dropHoldings } from 'gqlRequests'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}))

const itemTableConfig = {
  labels: [
    { name: 'name', direction: 'asc', format: 'avatar' },
    { name: 'performance', format: 'percent' },
    { name: 'followers', format: 'percent' },
    { name: 'popularity', format: 'percent' },
    { name: 'type', direction: 'asc' },
    { name: 'held', format: 'date' },
    { name: 'dropped', format: 'date' }
  ]
}

const itemToolbarConfig = () => ({
  button: { text: 'drop holdings', handler: dropHoldings() },
  selectable: { text: 'show dropped', filter: 'dropped' },
  typeFilter: 'type'
})

const HoldingList = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>
        <ItemTable items={getHoldings()} itemTableConfig={itemTableConfig} itemToolbarConfig={itemToolbarConfig()} />
      </div>
    </div>
  )
}

export default HoldingList
