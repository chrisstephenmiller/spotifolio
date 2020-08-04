import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { HoldingTable } from './components'
import { getHoldings } from 'gqlRequests'

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
        <HoldingTable holdings={holdings} />
      </div>
    </div>
  )
}

export default HoldingList
