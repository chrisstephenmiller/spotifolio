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
  const { items, itemTableConfig } = props

  const classes = useStyles()

  const [selectedItems, setSelectedItems] = useState([])

  const handleSelectAll = event => {
    const allSelectedItems = event.target.checked ? [...items] : []
    setSelectedItems(allSelectedItems)
  }

  const handleSelectOne = (event, item) => {
    const selectedIndex = selectedItems.map(selectedItem => selectedItem.id).indexOf(item.id)
    selectedIndex > -1 ? selectedItems.splice(selectedIndex, 1) : selectedItems.push(item)
    setSelectedItems([...selectedItems])
  }

  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  const [selectedSortLabel, setSortLabel] = useState('Name')
  const [selectedSortDirection, setSortDirection] = useState('asc')

  const sortAndPaginateItems = () => {
    const selectedLabelData = itemTableConfig.labels.find(label => label.name === selectedSortLabel)
    const defaultSortValue = item => item[selectedLabelData.name.toLowerCase()]
    const sortValue = selectedLabelData.value || defaultSortValue
    const ascOrDesc = selectedSortDirection === 'asc' ? 1 : -1
    const sortFunction = (a, b) => (sortValue(a) > sortValue(b) ? ascOrDesc : -ascOrDesc)
    const itemSelected = item => ({ ...item, selected: selectedItems.some(i => i.id === item.id) })
    const itemsSelected = items.map(itemSelected)
    const onePage = [page * rowsPerPage, (page + 1) * rowsPerPage]
    return itemsSelected.sort(sortFunction).slice(...onePage)
  }

  const tableItems = sortAndPaginateItems()

  return (
    <div>
      <ItemTableToolbar buttonConfig={itemTableConfig.button} selectedItems={selectedItems} />
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
                  allSelected={!!selectedItems.length && selectedItems.length === items.length}
                  someSelected={!!selectedItems.length && selectedItems.length !== items.length}
                  handleSelectAll={handleSelectAll}
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
