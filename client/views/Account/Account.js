import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

import { AccountProfile } from './components'
import { getProfile } from 'gqlRequests'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}))

const Account = () => {
  const classes = useStyles()
  const profile = getProfile()
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <AccountProfile profile={profile} />
        </Grid>
      </Grid>
    </div>
  )
}

export default Account
