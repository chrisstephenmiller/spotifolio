import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth'

const Navbar = () => {
  const { user, logout } = useAuth()
  return (
    <div>
      <h1>SPOTIFOLIO</h1>
      <nav>
        {user ? (
          <div style={{ display: 'inline-flex' }}>
            {/* The navbar will show these links after you log in */}
            {/* <img src={data.getProfile.imageUrl} style={{ height: 100, width: 100 }} /> */}
            <Link to="/">Home</Link>
            <Link to="/artists">Artists</Link>
            <Link to="/holdings">Holdings</Link>
            <a href="/" onClick={logout}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <a href="/auth/spotify">Login</a>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

export default Navbar
