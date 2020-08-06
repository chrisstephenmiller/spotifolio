import { useQuery, gql } from '@apollo/client'

const getFollowedArtistsQuery = gql`
  query {
    getFollowedArtists {
      name
      popularity
      followers
      images {
        url
      }
    }
  }
`

export const getFollowedArtists = () => {
  const { data } = useQuery(getFollowedArtistsQuery)
  return data ? data.getFollowedArtists : []
}
