import { useQuery, gql } from '@apollo/client'

const getSavedAlbumsQuery = gql`
  query {
    getSavedAlbums {
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

export const getSavedAlbums = () => {
  const { data, error } = useQuery(getSavedAlbumsQuery)
  if (error) console.log(error)
  return data ? data.getSavedAlbums : []
}
