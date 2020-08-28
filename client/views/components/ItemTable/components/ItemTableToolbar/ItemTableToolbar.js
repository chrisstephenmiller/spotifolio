import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Button, Checkbox, Typography } from '@material-ui/core'

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

const handleButtonClick = (buttonHandler, selectedItems, setSelectedItems) => {
  buttonHandler(selectedItems)
  setSelectedItems([])
}

const handleFilterCheckbox = setFilterCheckbox => setFilterCheckbox(event.target.checked)

const ItemTableToolbar = ({
  itemToolbarConfig,
  selectedItems,
  setSelectedItems,
  filterCheckbox,
  setFilterCheckbox
}) => {
  const classes = useStyles()

  const { button, checkbox } = itemToolbarConfig
  return (
    <div>
      <div className={classes.row}>
        <Checkbox color="primary" checked={filterCheckbox} onChange={() => handleFilterCheckbox(setFilterCheckbox)} />
        <Typography variant="button">{checkbox.text}</Typography>
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleButtonClick(button.handler, selectedItems, setSelectedItems)}
        >
          {button.text}
        </Button>
      </div>
      <div className={classes.row} />
    </div>
  )
}

export default ItemTableToolbar
