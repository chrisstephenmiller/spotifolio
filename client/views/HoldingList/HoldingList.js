import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { HoldingTable } from './components'

import { getHoldings } from 'gqlRequests'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}))

const HoldingList = () => {
  const classes = useStyles()
  const holdings = getHoldings()

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <HoldingTable holdings={holdings} />
      </div>
    </div>
  )
}

export default HoldingList
