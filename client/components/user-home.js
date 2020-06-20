import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const { name, graphQL } = props
  graphQL()
  return (
    <div>
      <h3>Welcome, {name}!</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log(state)
  return {
    name: state.user.name
  }
}

const mapDispatch = dispatch => {
  return {
    graphQL: () => {
      console.log('GraphQL!')
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
