import React from 'react'
import './App.css'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import history from './history'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home/Home'
import SearchPage from './pages/Search/SearchPage'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import Room from './pages/Room/Room'
import Overview from './pages/MenuAccount/Overview'
import Profile from './pages/MenuAccount/Profile'
import Favorite from './pages/MenuAccount/Favorite'
import HotelInvoiceDetail from './pages/MenuAccount/HotelInvoiceDetail'
import HistoryBooking from './pages/MenuAccount/HistoryBooking'
import Password from './pages/MenuAccount/Password'
import Booking from './pages/Booking/Booking'
import ErrorPage from './pages/404Page/ErrorPage'
import UserManagement from './pages/Admin/UserManagement'
import HotelManagement from './pages/Admin/HotelManagement'
import ReactNotifications from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <ReactNotifications />
        <Header />
  
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/search-page' component={SearchPage} /> 
          <Route path='/room-detail' component={Room}>
            <Route path='/room-detail/:id' component={Room} />
          </Route>

          <Route path='/404' component={ErrorPage} />
          
          <Route path='/sign-up' component={SignUp} />
          <Route path='/sign-in' component={SignIn} />

          <Route path='/booking' component={Booking} />

          <Route path='/account/overview/' component={Overview} />
          <Route path='/account/profile/' component={Profile} />
          <Route path='/account/favorite/' component={Favorite} />
          <Route path='/account/password/' component={Password} />

          <Route path='/account/history-booking/' component={HistoryBooking} />
          <Route path='/account/hotel-invoice-detail/' component={HotelInvoiceDetail}>
            <Route path='/account/hotel-invoice-detail/:id' component={HotelInvoiceDetail} />
          </Route>

          <Route path='/account/admin/user-management/' component={UserManagement} />
          <Route path='/account/admin/hotel-management/' component={HotelManagement} />
          
          <Redirect from='*' to='/404' />
          
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
