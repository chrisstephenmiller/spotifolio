import React from 'react'
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core'

const ItemTableHead = ({
  itemTableConfig,
  setSortLabel,
  selectedSortLabel,
  setSortDirection,
  selectedSortDirection,
  handleSelectPage,
  pageSelected,
  someSelected
}) => {
  const handleSetSortLabel = ({ name, direction }) => {
    return () => {
      const reverse = selectedSortDirection === 'asc' ? 'desc' : 'asc'
      setSortDirection(selectedSortLabel === name ? reverse : direction || 'desc')
      setSortLabel(name)
    }
  }

  const ItemTableSortLabel = ({ label }) => {
    return (
      <TableSortLabel
        active={selectedSortLabel === label.name}
        direction={selectedSortDirection}
        onClick={handleSetSortLabel(label)}
        style={{ textTransform: 'capitalize' }}
      >
        {label.name}
      </TableSortLabel>
    )
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox color="primary" checked={pageSelected} indeterminate={someSelected} onChange={handleSelectPage} />
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
