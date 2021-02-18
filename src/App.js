import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home/Home'
import SearchPage from './components/Search/SearchPage'
import SignUp from './components/Account/SignUp'
import SignIn from './components/Account/SignIn'

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/search-page' component={SearchPage} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/sign-in' component={SignIn} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
