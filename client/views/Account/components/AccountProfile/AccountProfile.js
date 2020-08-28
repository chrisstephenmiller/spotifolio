import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Card, CardContent, Avatar, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 100,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  }
}))

const AccountProfile = ({ profile }) => {
  const classes = useStyles()

  const ProfileInfo = ({ children }) => (
    <Typography color="textSecondary" variant="body1">
      {children}
    </Typography>
  )

  return (
    <Card>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h2">
              {profile.name || '...'}
            </Typography>
            <ProfileInfo>Followers: {profile.followers}</ProfileInfo>
            <ProfileInfo>Username: {profile.username}</ProfileInfo>
            <ProfileInfo>Email: {profile.email}</ProfileInfo>
          </div>
          <Avatar className={classes.avatar} src={profile.imageUrl} />
        </div>
      </CardContent>
    </Card>
  )
}

export default AccountProfile
