import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';

import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <AppBar
          className="app-bar"
          style={{boxShadow: "none"}}
          title='Wolf Walkathon'
          showMenuIconButton={false}
        />

        {this.props.children}
      </div>
    );
  }
}

export default App;
