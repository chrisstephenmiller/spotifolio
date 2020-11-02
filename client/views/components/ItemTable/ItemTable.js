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

const ItemTable = ({ items, itemTableConfig, itemToolbarConfig }) => {
  const classes = useStyles()

  const [typeFilters, setTypeFilters] = useState({ Artist: true, Track: true, Album: true })
  const [selectableCheckbox, setSelectableCheckbox] = useState(false)
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedSortLabel, setSortLabel] = useState('name')
  const [selectedSortDirection, setSortDirection] = useState('asc')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  const makeTableItems = () => {
    const { typeFilter, selectable } = itemToolbarConfig
    const mapItems = item => ({
      ...item,
      selectable: !item[selectable.filter],
      selected: selectedItems.some(selectedItem => selectedItem.id === item.id)
    })
    const filterItems = item => typeFilters[item[typeFilter]] && (selectableCheckbox ? item : item.selectable)
    const ascOrDesc = selectedSortDirection === 'asc' ? 1 : -1
    const sortItems = (a, b) => (a[selectedSortLabel] > b[selectedSortLabel] ? ascOrDesc : -ascOrDesc)
    return items
      .map(mapItems)
      .filter(filterItems)
      .sort(sortItems)
  }

  const tableItems = makeTableItems()
  const tableItemsPage = tableItems.slice(page * rowsPerPage, (page + 1) * rowsPerPage)

  const handleSelectOne = (event, item) => {
    const selectedIndex = selectedItems.map(selectedItem => selectedItem.id).indexOf(item.id)
    selectedIndex > -1 ? selectedItems.splice(selectedIndex, 1) : selectedItems.push(item)
    setSelectedItems([...selectedItems])
  }

  const handleSelectPage = event => {
    const selectedIndex = item => selectedItems.map(selectedItem => selectedItem.id).indexOf(item.id)
    const addItem = item => item.selectable && selectedIndex(item) < 0 && selectedItems.push(item)
    const removeItem = item => selectedItems.splice(selectedIndex(item), 1)
    tableItemsPage.filter(item => item.selectable).forEach(event.target.checked ? addItem : removeItem)
    setSelectedItems([...selectedItems])
  }

  const pageSelected = !!tableItemsPage.length && tableItemsPage.every(item => item.selected || !item.selectable)
  const someSelected = !pageSelected && !!selectedItems.length

  return (
    <div>
      <ItemTableToolbar
        itemToolbarConfig={itemToolbarConfig}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        selectableCheckbox={selectableCheckbox}
        setSelectableCheckbox={setSelectableCheckbox}
        typeFilters={typeFilters}
        setTypeFilters={setTypeFilters}
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
                  tableItems={tableItemsPage}
                  handleSelectOne={handleSelectOne}
                />
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <ItemTablePagination
            count={tableItems.length}
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
