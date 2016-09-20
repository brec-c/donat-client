import React, {Component} from 'react';
import {browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
// import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

import store from 'store';
import uuid from 'uuid';

const paperStyle = {
  height: 500,
  width: 800,
  margin: 20,
  padding: 40,
  display: 'inline-block',
};

class AddDonation extends Component {

    constructor(props, context) {
        super(props, context);

        // this.handleTouchTap = this.handleTouchTap.bind(this);

        // this.data = store.get('donationBundle') || {
        //
        // };
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

/*
<FontIcon className="material-icons">
    attach_money
</FontIcon>
*/

    render() {
        const isDisabled = !this.state.amount;
        return (
            <Paper style={paperStyle} zDepth={3}>
                <h1>Donate</h1>
                <TextField
                      hintText="$"
                      fullWidth={true}
                      type="number"
                      name="amount"
                      value={this.state.amount}
                      onChange={this.onAmountChange}
                      floatingLabelText="Amount to Donate"
                    />
                <TextField
                      hintText="Who gets the credit?"
                      type="text"
                      fullWidth={true}
                      value={this.state.studentName}
                      onChange={this.onStudentChange}
                      floatingLabelText="Student's Name (optional)"
                    />
                    <br/>
                <TextField
                  hintText="What do you want to shout?"
                  floatingLabelText="Shout out (optional)"
                  type="text"
                  multiLine={true}
                  rows={2}
                  fullWidth={true}
                  value={this.state.shoutOut}
                  onChange={this.onShoutOutChange}
                />
                <RaisedButton
                    label="Add Donation"
                    onTouchTap={this.onAddClick}
                    disabled={isDisabled}
                />
            </Paper>
        );
    }
}

export default AddDonation;
