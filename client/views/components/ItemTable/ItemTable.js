import React, { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { makeStyles } from '@material-ui/styles'
import { Card, CardActions, CardContent, Table } from '@material-ui/core'

import { ItemTableHead, ItemTableBody, ItemTablePagination, ItemTableToolbar } from './components'

const useStyles = makeStyles(() => ({
  content: {
    padding: 0
  },
  inner: {
    minWidth: 250
  },
  actions: {
    justifyContent: 'flex-end'
  }
}))

const ItemTable = props => {
  const { items, itemTableConfig, itemToolbarConfig } = props

  const classes = useStyles()

  const [filterCheckbox, setFilterCheckbox] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedSortLabel, setSortLabel] = useState('name')
  const [selectedSortDirection, setSortDirection] = useState('asc')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  const makeTableItems = () => {
    const selectableItems = items.map(item => ({
      ...item,
      selectable: !item[itemToolbarConfig.checkbox.filter],
      selected: selectedItems.some(sI => sI.id === item.id)
    }))
    const filteredItems = filterCheckbox ? selectableItems : selectableItems.filter(item => item.selectable)
    const ascOrDesc = selectedSortDirection === 'asc' ? 1 : -1
    const sortFunction = (a, b) => (a[selectedSortLabel] > b[selectedSortLabel] ? ascOrDesc : -ascOrDesc)
    return filteredItems.sort(sortFunction).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  }

  const tableItems = makeTableItems()

  const handleSelectOne = (event, item) => {
    const selectedIndex = selectedItems.map(selectedItem => selectedItem.id).indexOf(item.id)
    selectedIndex > -1 ? selectedItems.splice(selectedIndex, 1) : selectedItems.push(item)
    setSelectedItems([...selectedItems])
  }

  const handleSelectPage = event => {
    const selectedIndex = item => selectedItems.map(selectedItem => selectedItem.id).indexOf(item.id)
    const addItem = item => item.selectable && selectedIndex(item) < 0 && selectedItems.push(item)
    const removeItem = item => selectedItems.splice(selectedIndex(item), 1)
    tableItems.forEach(event.target.checked ? addItem : removeItem)
    setSelectedItems([...selectedItems])
  }

  const pageSelected = !!tableItems.length && tableItems.every(item => item.selected)
  const someSelected = !pageSelected && !!selectedItems.length

  return (
    <div>
      <ItemTableToolbar
        itemToolbarConfig={itemToolbarConfig}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        filterCheckbox={filterCheckbox}
        setFilterCheckbox={setFilterCheckbox}
      />
      <Card>
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <ItemTableHead
                  itemTableConfig={itemTableConfig}
                  selectedSortLabel={selectedSortLabel}
                  setSortLabel={setSortLabel}
                  selectedSortDirection={selectedSortDirection}
                  setSortDirection={setSortDirection}
                  pageSelected={pageSelected}
                  someSelected={someSelected}
                  handleSelectPage={handleSelectPage}
                />
                <ItemTableBody
                  itemTableConfig={itemTableConfig}
                  tableItems={tableItems}
                  handleSelectOne={handleSelectOne}
                />
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <ItemTablePagination
            count={items.length}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </CardActions>
      </Card>
    </div>
  )
}

export default ItemTable
