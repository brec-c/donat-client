import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';

import './App.css';

class App extends Component {
  render(){
    const styles = {
      title: {
        cursor: 'pointer',
      },
    };
    return (
      <div className="App">
        <AppBar
          className="app-bar"
          title={<span style={styles.title}>Wolf Walk-a-thon</span>}
          style={{boxShadow: "none"}}
          showMenuIconButton={false}
          onTitleTouchTap={() => {window.location="/"}}
        />

        {this.props.children}
      </div>
    );
  }
}

export default App;
