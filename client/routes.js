import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { UserHome } from './components'
import Broker from './broker'
import { useAuth } from './auth'

const Routes = () => {
  const { user } = useAuth()
  return (
    <Switch>
      {/* Routes placed here are available to all visitors */}
      {/* <Route path="/" component={notLoggedin} /> */}
      {user && (
        <Switch>
          <Route exact path="/home" render={() => <UserHome user={user} />} />
          <Route path="/" render={() => <Broker user={user} />} />
        </Switch>
      )}
      {/* Displays our Login component as a fallback */}
      <Route component={() => <p>Not logged in.</p>} />
    </Switch>
  )
}

export default withRouter(Routes)
