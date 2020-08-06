import React from 'react'
import { withRouter, Switch } from 'react-router-dom'
import { Main as MainLayout, Minimal as MinimalLayout, RouteWithLayout } from './layouts'
import {
  Account as AccountView,
  HoldingList as HoldingListView,
  AssetList as AssetListView,
  LoggedOut as LoggedOutView
} from './views'

import { useAuth } from './auth'

const Routes = () => {
  const { user } = useAuth()

  return (
    <div>
      <Switch>
        {/* Routes placed here are available to all visitors */}
        {user && (
          <Switch>
            <RouteWithLayout component={AccountView} layout={MainLayout} path="/account" />
            <RouteWithLayout component={HoldingListView} layout={MainLayout} path="/holdings" />
            <RouteWithLayout component={AssetListView} layout={MainLayout} path="/assets" />
            <RouteWithLayout component={() => <div />} layout={MainLayout} path="/" />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <RouteWithLayout component={LoggedOutView} layout={MinimalLayout} path="/" />
      </Switch>
    </div>
  )
}

export default withRouter(Routes)
