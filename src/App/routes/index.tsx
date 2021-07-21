import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
// import { LoadingOutlined } from '@ant-design/icons'

import Login from '../pages/auth/login'
import Signup from '../pages/auth/signup'
import ResetPassword from '../pages/auth/reset-password'
// import Setting from '../pages/setting'

import { PublicRoute, PrivateRoute } from './route'
import ShipmentPage from '../pages/shipment'
import CreateShipmentPage from '../pages/shipment/create'
import ViewShipmentPage from '../pages/shipment/view'
import BookingPage from '../pages/booking'
import ViewBookingPage from '../pages/booking/view'
import PurchaseOrderPage from '../pages/purchase-order'
import ViewPurchaseOrderPage from '../pages/purchase-order/view'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>

        <PublicRoute path='/auth/login'>
          <Login />
        </PublicRoute>

        <PublicRoute path='/auth/signup'>
          <Signup />
        </PublicRoute>

        <PublicRoute path='/auth/reset-password'>
          <ResetPassword />
        </PublicRoute>

        <PrivateRoute path='/booking/:id'>
          <ViewBookingPage />
        </PrivateRoute>

        <PrivateRoute path='/booking'>
          <BookingPage />
        </PrivateRoute>

        <PrivateRoute path='/purchase-order/:id'>
          <ViewPurchaseOrderPage />
        </PrivateRoute>

        <PrivateRoute path='/purchase-order'>
          <PurchaseOrderPage />
        </PrivateRoute>

        <PrivateRoute path='/shipment/create'>
          <CreateShipmentPage />
        </PrivateRoute>

        <PrivateRoute path='/shipment/:id'>
          <ViewShipmentPage />
        </PrivateRoute>

        <PrivateRoute path='/'>
          <ShipmentPage />
        </PrivateRoute>

      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
