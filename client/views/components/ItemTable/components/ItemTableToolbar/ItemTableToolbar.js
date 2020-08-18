import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(0.5),
    marginBottom: theme.spacing(1.5)
  },
  spacer: {
    flexGrow: 1
  }
}))

const ItemTableToolbar = ({ buttonConfig, selectedItems }) => {
  const classes = useStyles()

  return (
    <div>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button color="primary" variant="contained" onClick={() => buttonConfig.handler(selectedItems)}>
          {buttonConfig.text}
        </Button>
      </div>
      <div className={classes.row} />
    </div>
  )
}

export default ItemTableToolbar
