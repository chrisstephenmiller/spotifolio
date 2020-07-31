import { useQuery, gql } from '@apollo/client'

const getProfileQuery = gql`
  query {
    getProfile {
      name
      username
      followers
      email
      imageUrl
    }
  }
`

export const getProfile = () => {
  const { data } = useQuery(getProfileQuery)
  return data ? data.getProfile : {}
}
