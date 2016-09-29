import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

// import store from 'store';
// import uuid from 'uuid';
import DonationBundle from './DonationBundle';

import AmountField from './AmountField';

import './DonationForm.css';

const paperStyle = {
  height: 500,
  width: 800,
  marginTop: 10,
  textAlign: 'left',
  padding: 40,
  display: 'inline-block',
};

class DonationForm extends Component {
  constructor(props, context) {
    super(props, context);

    // look for a id in the props? or from the router?
    var key = props.params.key;

    this.bundle = new DonationBundle();
    this.state = this.bundle.getDonation(key) || this.bundle.createDonation();
  }

  onAmountChange = (proxy, value) => {
    this.setState({
      amount: value
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
    this.bundle.saveDonation(this.state);
    browserHistory.push('/donate/list');
  }

  render() {
    const isDisabled = !this.state.amount || Number(this.state.amount) === 0;
    const centeralign = {textAlign: 'center'};
    const amount = this.state.amount; // TODO: process this into $xxx.xx

    return (
      <div>
        <div style={{
          width: 800,
          margin: '80px auto 0'
        }}>
          <Link to="/donate/list">
            <FlatButton
              label="List all donations"
              className="backButton"
              secondary={true}
              icon={<FontIcon className='material-icons'>
                  arrow_back
                </FontIcon>
              }
            />
          </Link>
        </div>

        <div style={centeralign}>
          <Paper style={paperStyle} zDepth={3}>
            <h1>Add a Donation</h1>
            <AmountField
              amount={amount}
              onChange={this.onAmountChange.bind(this)}
            />
            <TextField
              hintText="Full name"
              type="text"
              fullWidth={true}
              value={this.state.studentName}
              onChange={this.onStudentChange.bind(this)}
              floatingLabelText="Student's Name (optional)"
            />
            <br/>
            <TextField
              hintText="What do you want to be shouted during the run?"
              floatingLabelText="Shout out (optional for donations $100 or greater)"
              type="text"
              multiLine={true}
              rows={2}
              fullWidth={true}
              value={this.state.shoutOut}
              onChange={this.onShoutOutChange.bind(this)}
            />
            <div className="addfooter">
              <RaisedButton
                label="Add Donation"
                onTouchTap={this.onAddClick.bind(this)}
                disabled={isDisabled}
              />
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default DonationForm;
