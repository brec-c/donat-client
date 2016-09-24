import React, {Component} from 'react';

import {Link, browserHistory} from 'react-router';

import Paper                from 'material-ui/Paper';
import RaisedButton         from 'material-ui/RaisedButton';
import FlatButton           from 'material-ui/FlatButton';

import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400, greenA400, greenA100} from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import StripeCheckout from 'react-stripe-checkout';

import store from 'store';

import './List.css';

const paperStyle = {
  maxHeight: 800,
  width: 800,
  marginTop: 100,
  textAlign: 'left',
  padding: '20px 40px',
  overflow: 'auto',
  display: 'inline-block'
};

const iconButtonElement = (
  <IconButton
    touch={true}
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

class DonationList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = store.get('donationBundle') || {donations: []};
    this.onEdit = this.onEdit.bind(this);
  }

  onEdit = (value) => {
    browserHistory.push(`/donate/edit/${value}`);
  }

  onDelete = (donationId) => {
    const dlist = this.state.donations.filter( d => {
      return d.key !== donationId;
    });
    this.setState({
      donations: dlist
    });
    store.set('donationBundle', {donations: dlist});
  }

  onPaymentStarted = () => {
    var _this = this;
    const request = new Request('/donations', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    fetch(request).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      response.text().then(donationId => {
          _this.setState({
            donationId: donationId
          });
      });
    }).catch(err => {
      console.log("bundle failed to save: "+err);
    });
  }

  getTotalAmount = () => {
    return this.state
      .donations.reduce(function(total, val){
        return total + Number(val.amount);
      }, 0);
  }

  onToken = (token) => {
    const _this = this;

    const charge = {
      amount: this.getTotalAmount() * 100,
      donationId: this.state.donationId,
      stripeToken: token
    };

    const request = new Request('/charge', {
      method: 'POST',
      body: JSON.stringify(charge),
      headers: new Headers({
          'Content-Type': 'application/json'
      })
    });
    fetch(request)
      .then(response => {
        if (!response.ok) {
          alert("Error paying: "+response.statusText);
          throw Error(response.statusText);
        }

        // go to success page?
        alert("Paid!  Thank you!");
        _this.setState({donations:[]});
        store.remove('donationBundle');

        return response;
      })
      .catch(err => {
          console.error(err);
      })
  }

  render() {
    const rows = this.state.donations;
    const total = this.getTotalAmount();
    const _this = this;
    const centeralign = {textAlign: 'center'};
    return (
      <div>
        <div style={centeralign}>
          <Paper style={paperStyle} zDepth={3} className="listPaper">
            <h1>
              Donations
            <Link
              to="/donate/add"
              style={{float: "right"}}>
              <FlatButton
                backgroundColor={greenA400}
                hoverColor={greenA100}
                label="Add Donation"
                labelPosition="after"
                icon={<FontIcon className="material-icons">attach_money</FontIcon>}
                />
            </Link>
            </h1>
            <List>
              { (rows.length === 0) ? <ListItem
                  disabled={true}
                  primaryText="No Donations added yet.  Click Add Donation button to get started"
                /> : ''
              }
              {rows.map(function(d){
                return <ListItem
                  key={d.key}
                  disabled={true}
                  leftIcon={<FontIcon className="material-icons">
                    {d.studentName ? 'face' : 'school'}
                  </FontIcon>}
                  rightIconButton={<IconMenu iconButtonElement={iconButtonElement}>
                    <MenuItem onTouchTap={function(){_this.onEdit(d.key)}}>Edit</MenuItem>
                    <MenuItem onTouchTap={function(){_this.onDelete(d.key)}}>Delete</MenuItem>
                  </IconMenu>}
                  primaryText={'$'+d.amount+' for '+ (d.studentName || 'Olds Elementary')}
                  secondaryText={d.shoutOut}
                  secondaryTextLines={1}
                />;
              })}
            </List>
            <div className="total-summary">
              <span>Total:</span>&nbsp;<b>${total}</b>
            </div>
          </Paper>
        </div>
        <div className="payNowFooter">
          { rows.length > 0 ?
          <StripeCheckout
            name="Fred A. Olds Elementary"
            description="Wolf Walkathon Fundraiser"
            panelLabel="Pay"
            currency="USD"
            amount={total*100}
            token={this.onToken}
            stripeKey="pk_test_LfX4pdpuTU5cBcy35taA7f0D"
            triggerEvent="onTouchTap"
          >
            <RaisedButton
              label="Pay Now"
              secondary={true}
              onTouchTap={this.onPaymentStarted}
            />
          </StripeCheckout>
          : null }
        </div>
      </div>
    );
  }
}

export default DonationList;
