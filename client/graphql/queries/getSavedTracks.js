import { useQuery, gql } from '@apollo/client'

const getSavedTracksQuery = gql`
  query {
    getSavedTracks {
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

export const getSavedTracks = () => {
  const { data, error } = useQuery(getSavedTracksQuery)
  if (error) console.log(error)
  return data ? data.getSavedTracks : []
}
