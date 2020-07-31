import React, { useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import moment from 'moment'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { makeStyles } from '@material-ui/styles'
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}))

const HoldingTable = props => {
  const { className, holdings, ...rest } = props

  const classes = useStyles()

  const [selectedHoldings, setSelectedHoldings] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  const handleSelectAll = event => {
    const { holdings: allHoldings } = props

    let allSelectedHoldings

    if (event.target.checked) {
      allSelectedHoldings = allHoldings.map(holding => holding.id)
    } else {
      allSelectedHoldings = []
    }

    setSelectedHoldings(allSelectedHoldings)
  }

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedHoldings.indexOf(id)
    let newSelectedHoldings = []

    if (selectedIndex === -1) {
      newSelectedHoldings = newSelectedHoldings.concat(selectedHoldings, id)
    } else if (selectedIndex === 0) {
      newSelectedHoldings = newSelectedHoldings.concat(selectedHoldings.slice(1))
    } else if (selectedIndex === selectedHoldings.length - 1) {
      newSelectedHoldings = newSelectedHoldings.concat(selectedHoldings.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelectedHoldings = newSelectedHoldings.concat(
        selectedHoldings.slice(0, selectedIndex),
        selectedHoldings.slice(selectedIndex + 1)
      )
    }

    setSelectedHoldings(newSelectedHoldings)
  }

  const handlePageChange = (event, page) => {
    setPage(page)
  }

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value)
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedHoldings.length === holdings.length}
                      color="primary"
                      indeterminate={selectedHoldings.length > 0 && selectedHoldings.length < holdings.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Popularity</TableCell>
                  <TableCell>Performance</TableCell>
                  <TableCell>Bought</TableCell>
                  <TableCell>Sold</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {holdings.slice(0, rowsPerPage).map(holding => {
                  const performance = holding.value.popularity - holding.asset.popularity
                  return (
                    <TableRow hover key={holding.id} selected={selectedHoldings.indexOf(holding.id) !== -1}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedHoldings.indexOf(holding.id) !== -1}
                          color="primary"
                          onChange={event => handleSelectOne(event, holding.id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameContainer}>
                          <Avatar className={classes.avatar} src={holding.asset.images.slice(-1)[0].url}>
                            {holding.asset.name.split(' ').map(([w]) => w)}
                          </Avatar>
                          <Typography variant="body1">{holding.asset.name}</Typography>
                        </div>
                      </TableCell>
                      <TableCell>{holding.asset.__typename}</TableCell>
                      <TableCell>{holding.asset.popularity}</TableCell>
                      <TableCell>{performance}</TableCell>
                      <TableCell>{moment(+holding.createdAt).format('M/DD/YYYY')}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={holdings.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
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
