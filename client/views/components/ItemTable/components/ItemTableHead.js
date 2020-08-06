import React from 'react'
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core'

const ItemTableHead = props => {
  const {
    itemData,
    setSortLabel,
    selectedSortLabel,
    setSortDirection,
    selectedSortDirection,
    handleSelectAll,
    allSelected,
    someSelected
  } = props

  const handleSetSortLabel = label => {
    return () => {
      const { direction } = itemData.find(i => i.label === label)
      const reverse = selectedSortDirection === 'asc' ? 'desc' : 'asc'
      selectedSortLabel === label ? setSortDirection(reverse) : setSortDirection(direction)
      setSortLabel(label)
    }
  }

  const ItemTableSortLabel = ({ label }) => {
    return (
      <TableSortLabel
        active={selectedSortLabel === label}
        direction={selectedSortDirection}
        onClick={handleSetSortLabel(label)}
      >
        {label}
      </TableSortLabel>
    )
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox color="primary" checked={allSelected} indeterminate={someSelected} onChange={handleSelectAll} />
        </TableCell>
        {itemData.map(itemTableSortLabel => {
          const { label } = itemTableSortLabel
          return (
            <TableCell key={label}>
              <ItemTableSortLabel label={label} />
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

export default ItemTableHead
