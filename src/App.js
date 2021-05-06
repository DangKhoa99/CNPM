import React from 'react'
import './App.css'
import { Router, Switch, Route , Link, Redirect, useHistory, useLocation } from 'react-router-dom'
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
import Booking from './pages/MenuAccount/Booking'
import HotelInvoiceDetail from './pages/MenuAccount/HotelInvoiceDetail'
import HistoryBooking from './pages/MenuAccount/HistoryBooking'
import Book from './pages/Booking/Booking'
import ErrorPage from './pages/404Page/ErrorPage'
import UserManagement from './pages/Admin/UserManagement'
import DetailUser from './pages/Admin/DetailUser'
import HotelManagement from './pages/Admin/HotelManagement'
import AddHotel from './pages/Admin/AddHotel'
import AddUser from './pages/Admin/AddUser'
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
            {/* <Route path='?:id' component={Room} />
            <Route path='*' component={ErrorPage} /> */}
          </Route>

          <Route path='/404' component={ErrorPage} />
          
          <Route path='/sign-up' component={SignUp} />
          <Route path='/sign-in' component={SignIn} />

          {/* TEST */}
          <Route path='/booking' component={Book} />


          <Route path='/account/overview/' component={Overview} />
          <Route path='/account/profile/' component={Profile} />
          <Route path='/account/favorite/' component={Favorite} />
          <Route path='/account/booking/' component={Booking} />
          <Route path='/account/history-booking/' component={HistoryBooking} />
          <Route path='/account/hotel-invoice-detail/' component={HotelInvoiceDetail} />

          <Route path='/account/admin/user-management/' component={UserManagement} />
          <Route path='/account/admin/detail-user' component={DetailUser} />
          <Route path='/account/admin/hotel-management/' component={HotelManagement} />
          <Route path='/account/admin/add-hotel/' component={AddHotel} />
          <Route path='/account/admin/add-user/' component={AddUser} />
          
          
          <Redirect from='*' to='/404' />
          
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
