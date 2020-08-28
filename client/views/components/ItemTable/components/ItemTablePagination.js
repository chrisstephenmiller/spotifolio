import React from 'react'
import { TablePagination } from '@material-ui/core'

const ItemTablePagination = ({ count, page, rowsPerPage, setPage, setRowsPerPage }) => {
  const handlePageChange = (event, currentPage) => {
    setPage(currentPage)
  }

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value)
    setPage(0)
  }

  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onChangePage={handlePageChange}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleRowsPerPageChange}
      rowsPerPageOptions={[5, 10, 25]}
    />
  )
}

export default ItemTablePagination
