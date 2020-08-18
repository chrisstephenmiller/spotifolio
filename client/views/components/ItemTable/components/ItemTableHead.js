import React from 'react'
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core'

const ItemTableHead = props => {
  const {
    itemTableConfig,
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
      const reverse = selectedSortDirection === 'asc' ? 'desc' : 'asc'
      const { name, direction } = label
      selectedSortLabel === name ? setSortDirection(reverse) : setSortDirection(direction || 'desc')
      setSortLabel(name)
    }
  }

  const ItemTableSortLabel = ({ label }) => {
    return (
      <TableSortLabel
        active={selectedSortLabel === label.name}
        direction={selectedSortDirection}
        onClick={handleSetSortLabel(label)}
      >
        {label.name}
      </TableSortLabel>
    )
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox color="primary" checked={allSelected} indeterminate={someSelected} onChange={handleSelectAll} />
        </TableCell>
        {itemTableConfig.labels.map(label => {
          return (
            <TableCell key={label.name}>
              <ItemTableSortLabel label={label} />
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

export default ItemTableHead
