import React from 'react'

export const UserHome = ({ user }) => {
  return (
    <div style={{ display: 'inline-flex' }}>
      <h3>Welcome, {user.name}!</h3>
    </div>
  )
}

export default UserHome
