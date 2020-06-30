import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { UserHome } from './components'

const Routes = ({ user }) => {
  const notLoggedin = () => <p>Not logged in.</p>
  return (
    <Switch>
      {/* Routes placed here are available to all visitors */}
      {/* <Route path="/" component={notLoggedin} /> */}
      {user && (
        <Switch>
          <Route path="/" component={UserHome} />
        </Switch>
      )}
      {/* Displays our Login component as a fallback */}
      <Route component={notLoggedin} />
    </Switch>
  )
}

export default withRouter(Routes)
