import React from 'react'
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core'

const ItemTableHead = props => {
  const {
    itemsMetadata,
    setSortLabel,
    selectedSortLabel,
    setSortDirection,
    selectedSortDirection,
    handleSelectAll,
    allSelected,
    someSelected
  } = props

  const handleSetSortLabel = itemMetadata => {
    return () => {
      const reverse = selectedSortDirection === 'asc' ? 'desc' : 'asc'
      const { label, direction } = itemMetadata
      selectedSortLabel === label ? setSortDirection(reverse) : setSortDirection(direction || 'desc')
      setSortLabel(label)
    }
  }

  const ItemTableSortLabel = ({ itemMetadata }) => {
    return (
      <TableSortLabel
        active={selectedSortLabel === itemMetadata.label}
        direction={selectedSortDirection}
        onClick={handleSetSortLabel(itemMetadata)}
      >
        {itemMetadata.label}
      </TableSortLabel>
    )
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox color="primary" checked={allSelected} indeterminate={someSelected} onChange={handleSelectAll} />
        </TableCell>
        {itemsMetadata.map(itemMetadata => {
          return (
            <TableCell key={itemMetadata.label}>
              <ItemTableSortLabel itemMetadata={itemMetadata} />
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

export default ItemTableHead
