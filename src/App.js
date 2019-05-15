import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './components/Navigation/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Register from './components/Registration/Register';
import Login from './components/Login/Login';
import Create from './components/Create/Create';
import SearchAllArticuls from './components/Search/SearchAllArticuls';
import Details from './components/Details/Details';
import MyArtticuls from './components/MyArticuls/MyArtticuls';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
          <Switch>
            <Route path='/register' component={Register}/>
            <Route path='/login' component={Login} />
            <Route path='/create' component={Create}/>
            <Route path='/myProduct' exact render={() => {
              return <Redirect to='/myProduct/page1'/>
            }}/>
            <Route path='/myProduct/:page' exact component={MyArtticuls} />
            <Route path='/search' exact render={() => {
              return <Redirect to='/search/page1' />
            }} />
            <Route path='/search/:page' exact component={SearchAllArticuls} />
            <Route path='/' exact render={() => {
              return <Redirect from='/' to='/page1' />
            }}/>
            <Route path='/:page' exact component={Home}/>
            <Route path='/:page/:articul' component={Details}/>
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
