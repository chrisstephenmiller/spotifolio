import React, { useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { makeStyles } from '@material-ui/styles'
import { Card, CardActions, CardContent, Table } from '@material-ui/core'

import { HoldingTableHead, HoldingTableBody, HoldingTablePagination } from './components'

const useStyles = makeStyles(() => ({
  root: {},
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

const sortHoldingsByLabelAndDirection = (sortLabel, sortDirection) => holdings => {
  const ascOrDesc = sortDirection === 'asc' ? 1 : -1
  const metric = i => (['name', '__typename'].includes(sortLabel) ? i.asset[sortLabel] : i[sortLabel])
  return [...holdings].sort((a, b) => (metric(a) > metric(b) ? ascOrDesc : -ascOrDesc))
}

const HoldingTable = props => {
  const { className, holdings, ...rest } = props

  const classes = useStyles()

  const [sortLabel, setSortLabel] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  const sortedHoldings = sortHoldingsByLabelAndDirection(sortLabel, sortDirection)(holdings)

  const [selectedHoldings, setSelectedHoldings] = useState([])

  const handleSelectAll = event => {
    const allSelectedHoldings = event.target.checked ? holdings.map(holding => holding.id) : []
    setSelectedHoldings(allSelectedHoldings)
  }

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedHoldings.indexOf(id)
    selectedIndex > -1 ? selectedHoldings.splice(selectedIndex, 1) : selectedHoldings.push(id)
    setSelectedHoldings([...selectedHoldings])
  }

  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <HoldingTableHead
                holdings={holdings}
                selectedHoldings={selectedHoldings}
                sortLabel={sortLabel}
                setSortLabel={setSortLabel}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                handleSelectAll={handleSelectAll}
              />
              <HoldingTableBody
                page={page}
                rowsPerPage={rowsPerPage}
                holdings={sortedHoldings}
                selectedHoldings={selectedHoldings}
                handleSelectOne={handleSelectOne}
              />
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <HoldingTablePagination
          holdings={holdings}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </CardActions>
    </Card>
  )
}

HoldingTable.propTypes = {
  className: PropTypes.string,
  holdings: PropTypes.array.isRequired
}

export default HoldingTable
