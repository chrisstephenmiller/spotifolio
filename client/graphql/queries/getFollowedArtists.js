import { useQuery, gql } from '@apollo/client'

const getFollowedArtistsQuery = gql`
  query {
    getFollowedArtists {
      id
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
  const { data, error } = useQuery(getFollowedArtistsQuery)
  if (error) console.log(error)
  return data ? data.getFollowedArtists : []
}
