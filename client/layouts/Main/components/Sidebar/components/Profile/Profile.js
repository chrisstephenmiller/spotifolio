import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Avatar, Typography, Divider } from '@material-ui/core'

import { getProfile, getHoldings } from 'gqlRequests'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}))

const Profile = () => {
  const classes = useStyles()
  const profile = getProfile()

  const holdings = getHoldings()

  const stats = ['dropped', 'held', 'total']
  const holdingFilter = (holding, stat) => stat === 'total' || (stat === 'dropped' ? holding.dropped : !holding.dropped)

  return (
    <div className={classes.root}>
      <Avatar alt="Person" className={classes.avatar} component={RouterLink} src={profile.imageUrl} to="/account" />
      <Typography className={classes.name} variant="h4">
        {profile.name || '...'}
      </Typography>
      <Divider className={classes.divider} />
      {stats.map(stat => {
        const filteredHoldings = holdings.filter(holding => holdingFilter(holding, stat))
        const score = Math.ceil(100 * filteredHoldings.reduce((p, c) => p + c.performance, 0)) / 100
        const color = score > 0 ? 'green' : score < 0 ? 'red' : 'grey'
        return (
          <Typography key={stat} className={classes.name} variant="h5" style={{ color }}>
            {stat.toUpperCase() + ': ' + (score > 0 ? '+' : '') + score + '%'}
          </Typography>
        )
      })}
    </div>
  )
}

export default Profile
