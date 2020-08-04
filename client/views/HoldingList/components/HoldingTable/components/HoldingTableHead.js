import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core'

const HoldingTableHead = props => {
  const {
    holdings,
    sortLabel,
    setSortLabel,
    sortDirection,
    setSortDirection,
    selectedHoldings,
    handleSelectAll,
    ...rest
  } = props

  const handleSetSortLabel = label => {
    return () => {
      if (sortLabel === label) setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
      setSortLabel(label)
    }
  }

  const holdingTableSortLabels = [
    { label: 'name', name: 'Name' },
    { label: 'performancePct', name: 'Performance' },
    { label: 'popularityPct', name: 'Popularity' },
    { label: 'followersPct', name: 'Followers' },
    { label: '__typename', name: 'Type' },
    { label: 'createdAt', name: 'Bought' },
    { label: 'destroyedAt', name: 'Sold' }
  ]

  const HoldingTableSortLabel = ({ children, label }) => {
    return (
      <TableSortLabel active={sortLabel === label} direction={sortDirection} onClick={handleSetSortLabel(label)}>
        {children}
      </TableSortLabel>
    )
  }

  const checkboxChecked = !!selectedHoldings.length && selectedHoldings.length === holdings.length
  const checkboxIndeterminate = selectedHoldings.length > 0 && selectedHoldings.length < holdings.length

  return (
    <TableHead {...rest}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={checkboxChecked}
            color="primary"
            indeterminate={checkboxIndeterminate}
            onChange={handleSelectAll}
          />
        </TableCell>
        {holdingTableSortLabels.map(htsl => (
          <TableCell key={htsl.label}>
            <HoldingTableSortLabel label={htsl.label}>{htsl.name}</HoldingTableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

HoldingTableHead.propTypes = {
  className: PropTypes.string,
  holdings: PropTypes.array.isRequired,
  selectedHoldings: PropTypes.array.isRequired,
  handleSelectAll: PropTypes.func.isRequired
}

export default HoldingTableHead
