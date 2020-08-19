import { useQuery, gql } from '@apollo/client'

export const getHoldingsQuery = gql`
  query {
    getHoldings {
      id
      name
      images {
        url
      }
      type
      spotifyId
      held
      popularity
      followers
      performance
      asset {
        name
        popularity
        followers
        images {
          url
        }
      }
      dropped
      value {
        popularity
        followers
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
