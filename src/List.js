import React, {Component} from 'react';

import {Link, browserHistory} from 'react-router';

import Paper        from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton   from 'material-ui/FlatButton';
import Divider      from 'material-ui/Divider';

import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400, greenA400, greenA100} from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import SuccessDialog from './SuccessDialog';

import StripeCheckout from 'react-stripe-checkout';

// import store from 'store';
import DonationBundle from './DonationBundle';

import './List.css';
import wolf from './images/cartoon-wolf.png';

import _ from 'underscore';

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

    this.bundle = new DonationBundle();
    this.state = this.bundle.get();
    this.onEdit = this.onEdit.bind(this);
  }

  onEdit = (value) => {
    browserHistory.push(`/donate/edit/${value}`);
  }

  onDelete = (donationId) => {
    this.bundle.deleteDonation(donationId);
    const b = this.bundle.get();
    this.setState({
      donations: b.donations,
      total: b.total
    })
  }

  onPaymentStarted = () => {
    const request = new Request('/donations', {
      method: 'POST',
      body: JSON.stringify(this.bundle.get()),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    fetch(request).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      response.text().then(donationId => {
          this.setState({
            donationId: donationId
          });
      });
    }).catch(err => {
      console.log("bundle failed to save: "+err);
    });
  }

  getTotalAmount = () => {
    return this.state.total || 0;
  }

  onToken = (token) => {
    const charge = {
      amount: this.getTotalAmount() * 100,
      donationId: this.state.donationId,
      stripeToken: token
    };

    const request = new Request('/charges', {
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

        this.setState({
          donations:{},
          total: 0
        });

        this.bundle.clear();

        this.setState({
          successOpen: true
        });

        return response;
      })
      .catch(err => {
          console.error(err);
      })
  }

  onSuccessClosed = () => {
    this.setState({
      successOpen: false
    });
  }

  render() {
    const rows = _.values(this.state.donations);
    const total = this.getTotalAmount();
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
              {rows.map( (d) => {
                return <ListItem
                  key={d.key}
                  disabled={true}
                  leftIcon={<FontIcon className="material-icons">
                    {d.studentName ? 'face' : 'school'}
                  </FontIcon>}
                  rightIconButton={<IconMenu iconButtonElement={iconButtonElement}>
                    <MenuItem onTouchTap={this.onEdit.bind(this, d.key)}>Edit</MenuItem>
                    <MenuItem onTouchTap={this.onDelete.bind(this, d.key)}>Remove</MenuItem>
                  </IconMenu>}
                  primaryText={'$'+d.amount+' for '+ (d.studentName || 'Olds Elementary')}
                  secondaryText={d.shoutOut}
                  secondaryTextLines={1}
                />;
              })}
            </List>
            <Divider style={{marginBottom:'20px'}}/>
            <div className="total-summary">
              <span>Total:</span>&nbsp;<b>${total}</b>
            </div>
          </Paper>
        </div>
        <div className="payNowFooter">
          { rows.length > 0 ?
          <StripeCheckout
            name="Wolf Walk-a-thon"
            description="Fundraiser for Fred Olds PTA"
            image={wolf}
            panelLabel="Pay"
            currency="USD"
            amount={total*100}
            token={this.onToken}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
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
        <SuccessDialog
          successOpen={this.state.successOpen || false}
          onClose={this.onSuccessClosed.bind(this)}
        />
      </div>
    );
  }
}

export default DonationList;
