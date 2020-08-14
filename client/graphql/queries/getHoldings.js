import { useQuery, gql } from '@apollo/client'

export const getHoldingsQuery = gql`
  query {
    getHoldings {
      id
      spotifyId
      createdAt
      popularity
      followers
      performance
      asset {
        name
        popularity
        ... on Artist {
          followers
        }
        images {
          url
        }
      }
      destroyedAt
      value {
        popularity
        ... on Artist {
          followers
        }
        images {
          url
        }
      }
    }
  }
`

export const getHoldings = () => {
  const { data, error } = useQuery(getHoldingsQuery)
  if (error) console.log(error)
  return data ? data.getHoldings : []
}
