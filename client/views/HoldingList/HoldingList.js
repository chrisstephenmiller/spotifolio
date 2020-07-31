import React from 'react'
import { makeStyles } from '@material-ui/styles'

import { HoldingTable } from './components'

import { useQuery, gql } from '@apollo/client'

const getHoldings = gql`
  query {
    getHoldings {
      id
      createdAt
      asset {
        name
        popularity
        images {
          url
        }
      }
    }
  }
`

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}))

const HoldingList = () => {
  const classes = useStyles()
  const { loading, error, data } = useQuery(getHoldings)
  if (loading || error) return null
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <HoldingTable holdings={data.getHoldings} />
      </div>
    </div>
  )
}

export default HoldingList
