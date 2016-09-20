import React, { Component } from 'react';
import { browserHistory, Redirect, Router, Route } from 'react-router';

import AppBar from 'material-ui/AppBar';

import './App.css';

import DonationList from './List';
import AddDonation  from './Add'

class App extends Component {

    render(){
        return (
            <div>
                <AppBar
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
                </Router>
            </div>
        );
    }

}

export default App;
