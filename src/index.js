import React from 'react';
import ReactDOM from 'react-dom';

import { browserHistory, Router, IndexRoute, Route } from 'react-router';

import App from './App';
import DonationList from './List';
import DonationForm from './DonationForm';

import './index.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import {purple500} from 'material-ui/styles/colors'

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  appBar: {
    color: "transparent",
    boxShadow: "none",
    height: 50
  }
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={browserHistory}>
      <Route path='/donate'     component={App}>
        <IndexRoute             component={DonationList} />
        <Route path='list'      component={DonationList} />
        <Route path='add'       component={DonationForm} />
        <Route path='edit/:key' component={DonationForm} />
      </Route>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
