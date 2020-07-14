import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const query = gql`
  query {
    getHoldings {
      id
      spotifyId
      asset {
        name
        popularity
      }
    }
  }
`

export const Holdings = () => {
  const { loading, error, data } = useQuery(query)
  if (loading || error) return null
  return (
    <div style={{ display: 'inline-flex' }}>
      <ol>
        {data.getHoldings.map(holding => {
          console.log(holding.asset)
          return (
            <p key={holding.spotifyId} style={{ display: 'flex', flexDirection: 'column' }}>
              <span>
                - {holding.asset.name} - {holding.asset.__typename}
              </span>
              <span>- Popularity: {holding.asset.popularity}</span>
            </p>
          )
        })}
      </ol>
    </div>
  )
}

export default Holdings
