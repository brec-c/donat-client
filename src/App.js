import React, { Component } from 'react';
import { browserHistory, Redirect, Router, Route } from 'react-router';

import AppBar from 'material-ui/AppBar';

import './App.css';

import DonationList from './List';
import AddDonation  from './Add'
import EditDonation from './Edit'

class App extends Component {

  // TODO:
  // - add success route
  // - add edit route
  //
    render(){
        return (
            <div className="App">
                <AppBar
                  className="app-bar"
                  style={{boxShadow: "none"}}
                    title='Wolf Walkathon'
                    showMenuIconButton={false}
                />
                <Router history={browserHistory}>
                    <Route path='/' component={AddDonation}>
                        <Redirect from='/' to='/donate/add' />
                        <Redirect from='/donate' to='/donate/add' />
                    </Route>
                    <Route path='/donate/list' component={DonationList} />
                    <Route path='/donate/add' component={AddDonation} />
                    <Route path='/donate/edit/:id' component={EditDonation} />
                </Router>
            </div>
        );
    }

}

export default App;
