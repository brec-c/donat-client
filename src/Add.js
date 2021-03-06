import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import store from 'store';
import uuid from 'uuid';

import './Add.css';

const paperStyle = {
  height: 500,
  width: 800,
  marginTop: 10,
  textAlign: 'left',
  padding: 40,
  display: 'inline-block',
};

const breadcrumbStyle = {
    width: 800,
    margin: '80px auto 0'
};

class AddDonation extends Component {

    constructor(props, context) {
        super(props, context);

        this.donationBundle = store.get('donationBundle') || { donations: [] };

        this.state = {
            amount: '',
            studentName: '',
            shoutOut: '',
            key: uuid.v1()
        };

        this.onAddClick = this.onAddClick.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onStudentChange = this.onStudentChange.bind(this);
        this.onShoutOutChange = this.onShoutOutChange.bind(this);
    }

    onAmountChange = (proxy, value) => {
        this.setState({
            amount: Number(value)
        });
    }

    onStudentChange = (proxy, value) => {
        this.setState({
            studentName: value
        });
    }
    onShoutOutChange = (proxy, value) => {
        this.setState({
            shoutOut: value
        });
    }

    onAddClick = () => {
        var bundle = store.get('donationBundle') || {
            donations: []
        };
        bundle.donations.push(this.state);
        store.set('donationBundle', bundle);
        browserHistory.push('/donate/list');
    }


    }
}

export default AddDonation;
