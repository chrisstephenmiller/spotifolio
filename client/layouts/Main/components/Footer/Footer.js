import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Link } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="body1">
        &copy;{' '}
        <Link component="a" href="/">
          Spotifol.io
        </Link>
        {' - 2020'}
      </Typography>
      <Typography variant="caption">Study music like stocks.</Typography>
    </div>
  )
}

export default Footer
