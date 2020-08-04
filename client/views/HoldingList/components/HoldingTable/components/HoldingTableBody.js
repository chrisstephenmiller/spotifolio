import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import moment from 'moment'
import { makeStyles } from '@material-ui/styles'
import { Avatar, Checkbox, TableBody, TableCell, TableRow, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {},
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  performance: {
    display: 'flex',
    fontWeight: 'bold'
  }
}))

const HoldingTableBody = props => {
  const { className, holdings, page, rowsPerPage, selectedHoldings, handleSelectOne, ...rest } = props

  const classes = useStyles()

  const PctChange = ({ pct }) => {
    const color = pct > 0 ? 'green' : pct < 0 ? 'red' : 'grey'
    return (
      <Typography variant="h6" style={{ fontWeight: 'bold', color }}>
        {pct}%
      </Typography>
    )
  }

  return (
    <TableBody {...rest} className={clsx(classes.root, className)}>
      {holdings.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map(holding => {
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
                  {holding.asset.name.split(' ').map(([i]) => i)}
                </Avatar>
                <Typography variant="h5">{holding.asset.name}</Typography>
              </div>
            </TableCell>
            <TableCell>
              <PctChange pct={holding.performancePct} />
            </TableCell>
            <TableCell>
              <PctChange pct={holding.popularityPct} />
            </TableCell>
            <TableCell>
              <PctChange pct={holding.followersPct} />
            </TableCell>
            <TableCell>{holding.asset.__typename}</TableCell>
            <TableCell>{moment(+holding.createdAt).format('M/DD/YYYY')}</TableCell>
            <TableCell>{holding.destroyedAt ? moment(+holding.destroyedAt).format('M/DD/YYYY') : '-'}</TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

HoldingTableBody.propTypes = {
  className: PropTypes.string,
  holdings: PropTypes.array.isRequired
}

export default HoldingTableBody
