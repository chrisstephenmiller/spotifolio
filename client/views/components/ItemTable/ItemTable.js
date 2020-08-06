import React, { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { makeStyles } from '@material-ui/styles'
import { Card, CardActions, CardContent, Table } from '@material-ui/core'

import { ItemTableHead, ItemTableBody, ItemTablePagination } from './components'

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
  const { items, itemData } = props

  const classes = useStyles()

  const [selectedItems, setSelectedItems] = useState([])

  const handleSelectAll = event => {
    const allSelectedItems = event.target.checked ? items.map(item => item.id) : []
    setSelectedItems(allSelectedItems)
  }

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedItems.indexOf(id)
    selectedIndex > -1 ? selectedItems.splice(selectedIndex, 1) : selectedItems.push(id)
    setSelectedItems([...selectedItems])
  }

  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  const [selectedSortLabel, setSortLabel] = useState('Name')
  const [selectedSortDirection, setSortDirection] = useState('asc')

  const sortAndPaginateItems = () => {
    const ascOrDesc = selectedSortDirection === 'asc' ? 1 : -1
    const { value } = itemData.find(i => i.label === selectedSortLabel)
    const sortFunction = (a, b) => (value(a) > value(b) ? ascOrDesc : -ascOrDesc)
    return [...items].sort(sortFunction).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  }

  const tableItems = sortAndPaginateItems()

  return (
    <Card>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <ItemTableHead
                itemData={itemData}
                selectedSortLabel={selectedSortLabel}
                setSortLabel={setSortLabel}
                selectedSortDirection={selectedSortDirection}
                setSortDirection={setSortDirection}
                allSelected={!!selectedItems.length && selectedItems.length === items.length}
                someSelected={!!selectedItems.length && selectedItems.length !== items.length}
                handleSelectAll={handleSelectAll}
              />
              <ItemTableBody
                itemData={itemData}
                tableItems={tableItems}
                selectedItems={selectedItems}
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
  )
}

export default ItemTable
