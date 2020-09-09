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

const handleTypeFilterChange = (typeFilter, typeFilters, setTypeFilters) =>
  setTypeFilters({ ...typeFilters, [typeFilter[0]]: !typeFilter[1] })

const handleFilterCheckbox = setSelectableCheckbox => setSelectableCheckbox(event.target.checked)

const ItemTableToolbar = ({
  itemToolbarConfig,
  selectedItems,
  setSelectedItems,
  selectableCheckbox,
  setSelectableCheckbox,
  typeFilters,
  setTypeFilters
}) => {
  const classes = useStyles()

  const { button, selectable } = itemToolbarConfig
  return (
    <div>
      <div className={classes.row}>
        <Checkbox
          color="primary"
          checked={selectableCheckbox}
          onChange={() => handleFilterCheckbox(setSelectableCheckbox)}
        />
        <Typography variant="button">{selectable.text}</Typography>
        <span className={classes.spacer} />
        {Object.entries(typeFilters).map(typeFilter => {
          return (
            <div key={typeFilter[0]}>
              <Typography variant="button">{typeFilter[0] + 's'}</Typography>
              <Checkbox
                color="primary"
                checked={typeFilter[1]}
                onChange={() => handleTypeFilterChange(typeFilter, typeFilters, setTypeFilters)}
              />
            </div>
          )
        })}
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
