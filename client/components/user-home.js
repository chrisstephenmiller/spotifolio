import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const getLists = gql`
  {
    getFollowedArtists {
      name
      spotifyId
      popularity
      followers
    }
    getUserPlaylists {
      name
      spotifyId
      total
    }
  }
`

export const UserHome = ({ user }) => {
  const { loading, error, data } = useQuery(getLists)
  if (loading || error) return null
  console.log(data)
  return (
    <div style={{ display: 'inline-flex' }}>
      <h3>Welcome, {user.name}!</h3>
      <ol>
        {data.getFollowedArtists.map(artist => {
          return (
            <p key={artist.spotifyId} style={{ display: 'flex', flexDirection: 'column' }}>
              <span>{artist.name}</span>
              <span>— followers: {artist.followers}</span>
              <span>— popularity: {artist.popularity}</span>
            </p>
          )
        })}
      </ol>
      <ol>
        {data.getUserPlaylists.map(playlist => {
          return (
            <p key={playlist.spotifyId} style={{ display: 'flex', flexDirection: 'column' }}>
              <span>{playlist.name}</span>
              <span>— tracks: {playlist.total}</span>
            </p>
          )
        })}
      </ol>
    </div>
  )
}

export default UserHome
