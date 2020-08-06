import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  },
  logo: {
    color: 'white'
  }
}))

const Topbar = () => {
  const classes = useStyles()

  return (
    <AppBar className={classes.root} color="primary" position="fixed">
      <Toolbar>
        <RouterLink to="/">
          <span className={classes.logo}>SPOTIFOLIO</span>
        </RouterLink>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
