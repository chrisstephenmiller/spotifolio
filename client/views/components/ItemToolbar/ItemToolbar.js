import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  spacer: {
    flexGrow: 1
  }
}))

const ItemToolbar = props => {
  const classes = useStyles()

  return (
    <div>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button color="primary" variant="contained">
          Add Holdings
        </Button>
      </div>
      <div className={classes.row} />
    </div>
  )
}

export default ItemToolbar
