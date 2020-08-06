import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Divider, Drawer } from '@material-ui/core'
import PeopleIcon from '@material-ui/icons/People'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

import { Profile, SidebarNav } from './components'

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}))

const Sidebar = props => {
  const { open, variant, onClose } = props

  const classes = useStyles()

  const pages = [
    {
      title: 'Holdings',
      href: '/holdings',
      icon: <PeopleIcon />
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    }
  ]

  return (
    <Drawer anchor="left" classes={{ paper: classes.drawer }} onClose={onClose} open={open} variant={variant}>
      <div className={classes.root}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
    </Drawer>
  )
}

export default Sidebar
