import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { FollowedAssets, Holdings } from './components'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const getAssets = gql`
  query {
    getFollowedArtists {
      name
      popularity
      spotifyId
    }
  }
`
const getHoldings = gql`
  query {
    getHoldings {
      spotifyId
      createdAt
      asset {
        name
        popularity
      }
    }
  }
`
const addHoldings = gql`
  mutation($artistIds: [String] = [], $trackIds: [String] = [], $albumIds: [String] = []) {
    addHoldings(artistIds: $artistIds, trackIds: $trackIds, albumIds: $albumIds) {
      spotifyId
      asset {
        name
        popularity
        ... on Artist {
          followers
        }
      }
    }
  }
`
const Broker = ({ user }) => {
  const [addHolding] = useMutation(addHoldings, { refetchQueries: [{ query: getHoldings }] })

  const { loading: assetsLoading, assetsError, data: assetsData } = useQuery(getAssets)
  const { loading: holdingsLoading, holdingsError, data: holdingsData } = useQuery(getHoldings)

  if (assetsLoading || holdingsLoading || assetsError || holdingsError) return null

  const holdings = holdingsData.getHoldings

  return (
    <Switch>
      <Route
        path="/artists"
        render={() => (
          <FollowedAssets
            user={user}
            assets={assetsData.getFollowedArtists}
            holdings={holdings}
            addHolding={addHolding}
          />
        )}
      />
      <Route path="/holdings" render={() => <Holdings user={user} holdings={holdings} />} />
    </Switch>
  )
}

export default withRouter(Broker)
