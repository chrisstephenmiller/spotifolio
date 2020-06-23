import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfile } from '../store'

export const UserHome = props => {
  const { name, imageUrl, fetchProfile } = props
  // fetchProfile()
  return (
    <div>
      <h3>Welcome, {name}!</h3>
      <img src={imageUrl} style={{ height: 100, width: 100 }} />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.name,
    imageUrl: state.user.imageUrl
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProfile() {
      dispatch(getProfile())
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
