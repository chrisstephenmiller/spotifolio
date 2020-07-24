import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { FollowedAssets, Holdings } from './components'
import { useQuery, useMutation, gql } from '@apollo/client'

const getAssets = gql`
  query {
    getFollowedArtists {
      name
      popularity
      spotifyId
    }
    getSavedTracks {
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

  const FollowedAsset = assets => (
    <FollowedAssets user={user} assets={assets} holdings={holdings} addHolding={addHolding} />
  )

  return (
    <Switch>
      <Route path="/artists" render={() => FollowedAsset(assetsData.getFollowedArtists)} />
      <Route path="/tracks" render={() => FollowedAsset(assetsData.getSavedTracks)} />
      <Route path="/holdings" render={() => <Holdings user={user} holdings={holdings} />} />
    </Switch>
  )
}

export default withRouter(Broker)
