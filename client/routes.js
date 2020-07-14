import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { UserHome, FollowedArtists, Holdings } from './components'
import { useAuth } from './auth'

const Routes = () => {
  const { user } = useAuth()
  return (
    <Switch>
      {/* Routes placed here are available to all visitors */}
      {/* <Route path="/" component={notLoggedin} /> */}
      {user && (
        <Switch>
          <Route path="/artists" render={() => <FollowedArtists user={user} />} />
          <Route path="/holdings" render={() => <Holdings user={user} />} />
          <Route path="/" render={() => <UserHome user={user} />} />
        </Switch>
      )}
      {/* Displays our Login component as a fallback */}
      <Route component={() => <p>Not logged in.</p>} />
    </Switch>
  )
}

export default withRouter(Routes)
