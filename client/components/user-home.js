import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const query = gql`
  {
    getProfile {
      name
      imageUrl
    }
  }
`

export const UserHome = ({ user }) => {
  const { loading, error, data } = useQuery(query)
  if (loading || error) return null
  return (
    <div>
      <h3>Welcome, {data.getProfile.name}!</h3>
      <img src={data.getProfile.imageUrl} style={{ height: 100, width: 100 }} />
    </div>
  )
}

export default UserHome
