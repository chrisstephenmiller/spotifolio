import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 150,
    textAlign: 'center'
  }
}))

const LoggedOut = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <a href="/auth/spotify">
              <Typography variant="h1">Log in to Spotifolio.</Typography>
            </a>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default LoggedOut
