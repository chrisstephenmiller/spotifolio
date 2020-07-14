import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const query = gql`
  query {
    getFollowedArtists {
      name
      popularity
      spotifyId
    }
  }
`

export const FollowedArtists = () => {
  const { loading, error, data } = useQuery(query)
  if (loading || error) return null
  return (
    <div style={{ display: 'inline-flex' }}>
      <ol>
        {data.getFollowedArtists.map(artist => {
          return (
            <p key={artist.spotifyId} style={{ display: 'flex', flexDirection: 'column' }}>
              <span>- {artist.name}</span>
              <span>- Popularity: {artist.popularity}</span>
            </p>
          )
        })}
      </ol>
    </div>
  )
}

export default FollowedArtists
