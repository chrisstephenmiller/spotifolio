import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Avatar, Typography } from '@material-ui/core'

import { getProfile } from 'gqlRequests'

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

  return (
    <div className={classes.root}>
      <Avatar alt="Person" className={classes.avatar} component={RouterLink} src={profile.imageUrl} to="/account" />
      <Typography className={classes.name} variant="h4">
        {profile.name || '...'}
      </Typography>
    </div>
  )
}

export default Profile
