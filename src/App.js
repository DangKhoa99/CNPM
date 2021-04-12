import React, {useState} from 'react'
import './App.css'
import { Router, Switch, Route , Redirect} from 'react-router-dom'
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
import HistoryBooking from './pages/MenuAccount/HistoryBooking'
import Book from './pages/Booking/Booking'
import ErrorPage from './pages/404Page/ErrorPage'

import ReactNotifications from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'


//SearchPage->SearchResult
//rooms->itemDetail/:id
// use Redux Provider

function App() {
  // const [token, setToken] = useState();
  // if(!token){
  //   return <SignIn setToken={setToken}/>
  // }

  return (
    <Router history={history}>
      <div className="App">
        <ReactNotifications />
        <Header />
  
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/search-page' component={SearchPage} /> 
          <Route path='/sign-up' component={SignUp} />
          <Route path='/sign-in' component={SignIn} />
          <Route path='/room-detail' component={Room}>
            {/* <Route path='?:id' component={Room} />
            <Route path='*' component={ErrorPage} /> */}
          </Route>

          <Route path='/booking' component={Book} />
          
          <Route path='/account/overview/' component={Overview} />
          <Route path='/account/profile/' component={Profile} />
          <Route path='/account/favorite/' component={Favorite} />
          <Route path='/account/booking/' component={Booking} />
          <Route path='/account/history-booking/' component={HistoryBooking} />

          <Route path='/404' component={ErrorPage} />
          <Redirect from='*' to='/404' />
          
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
