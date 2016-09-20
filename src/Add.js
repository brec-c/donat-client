import React, {Component} from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

const paperStyle = {
  height: 500,
  width: 800,
  margin: 20,
  padding: 40,
  display: 'inline-block',
};

const addStyle = {
    textAlign: 'center'
};

class AddDonation extends Component {

    onAmountChange = () => {
        console.log("changed");
    }

    onAddClick = () => {
        console.log("clicked");
    }

    render() {
        return (
            <Paper style={paperStyle} zDepth={3}>
                <h1>Donate</h1>
                <FontIcon className="material-icons">
                    attach_money
                </FontIcon>
                <TextField
                      hintText="Amount"
                      fullWidth={true}
                      onChange={this.onAmountChange}
                      floatingLabelText="Amount to Donate"
                    />
                <TextField
                      hintText="Who gets the credit?"
                      fullWidth={true}
                      onChange={this.onChange}
                      floatingLabelText="Student's Name (optional)"
                    />
                    <br/>
                <TextField
                  hintText="What do you want to shout?"
                  floatingLabelText="Shout out (optional)"
                  multiLine={true}
                  rows={2}
                  fullWidth={true}
                />
                <RaisedButton
                    label="Add Donation"
                    onClick={this.onAddClick}
                    style={addStyle}
                />
            </Paper>
        );
    }
}

export default AddDonation;
