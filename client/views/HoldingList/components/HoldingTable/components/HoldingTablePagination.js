import React from 'react'
import PropTypes from 'prop-types'
import { TablePagination } from '@material-ui/core'

const HoldingTablePagination = props => {
  const { holdings, page, rowsPerPage, setPage, setRowsPerPage, ...rest } = props

  const handlePageChange = (event, currentPage) => {
    setPage(currentPage)
  }

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value)
    setPage(0)
  }

  return (
    <TablePagination
      {...rest}
      component="div"
      count={holdings.length}
      page={page}
      onChangePage={handlePageChange}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleRowsPerPageChange}
      rowsPerPageOptions={[5, 10, 25]}
    />
  )
}

HoldingTablePagination.propTypes = {
  className: PropTypes.string,
  holdings: PropTypes.array.isRequired
}

export default HoldingTablePagination
