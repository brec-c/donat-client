import React, { Component } from 'react';
import { browserHistory, Redirect, Router, Route } from 'react-router';

import AppBar from 'material-ui/AppBar';

import './App.css';

import DonationList from './List';
import AddDonation  from './Add'

class App extends Component {

    barStyle: {
        'background-color': '#9C27B0'
    };

    render(){
        return (
            <div>
                <AppBar
                    title='Wolf Walkathon'
                    showMenuIconButton={false}
                    style={this.barStyle}
                />

                <Router history={browserHistory}>
                    {/* Want this to redirect to Add instead of list */}
                    <Route path='/' component={AddDonation}>
                        <Redirect from='/' to='/add' />
                    </Route>
                    <Route path='/list' component={DonationList} />
                    <Route path='/add' component={AddDonation} />
                </Router>
            </div>
        );
    }

}

export default App;
