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
  const { data, error } = useQuery(getProfileQuery)
  if (error) console.log(error)
  return data ? data.getProfile : {}
}
