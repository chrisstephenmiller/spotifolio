import { useQuery, gql } from '@apollo/client'

const getHoldingsQuery = gql`
  query {
    getHoldings {
      id
      spotifyId
      createdAt
      popularityPct
      followersPct
      performancePct
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
  const { data } = useQuery(getHoldingsQuery)
  return data ? data.getHoldings : []
}
