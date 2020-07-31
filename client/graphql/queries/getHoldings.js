import { useQuery, gql } from '@apollo/client'

const getHoldingsQuery = gql`
  query {
    getHoldings {
      id
      spotifyId
      createdAt
      asset {
        name
        popularity
        images {
          url
        }
      }
      value {
        popularity
      }
    }
  }
`

export const getHoldings = () => {
  const { data } = useQuery(getHoldingsQuery)
  return data ? data.getHoldings : []
}
