import React, {Component} from 'react';

import Paper                from 'material-ui/Paper';
import RaisedButton         from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd           from 'material-ui/svg-icons/content/add';

import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400, greenA400} from 'material-ui/styles/colors';
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
  padding: 40,
  overflow: 'auto',
  display: 'inline-block'
};

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more options"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

class DonationList extends Component {
    constructor(props, context) {
        super(props, context);

        // this.handleTouchTap = this.handleTouchTap.bind(this);

        this.state = store.get('donationBundle') || {donations: []};

        this.onEdit = this.onEdit.bind(this);
    }

    onEdit = (value) => {
        console.log("implement edit for "+value);
    }

    onDelete = (value) => {
        console.log("implement delete for "+value);
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
        }).catch(err=>{
            console.log("bundle failed to save: "+err);
        });
    }

    getTotalAmount = () => {
        return this.state
            .donations.reduce(function(total, val){
                return total + val.amount;
            }, 0);
    }

    onToken = (token) => {
        // we also need to pass up the amount
        // const total = getTotalAmount();
        token.donationId = this.state.donationId;

        const request = new Request('/charge', {
            method: 'POST',
            body: JSON.stringify(token),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        fetch(request).then(response => {
            if (!response.ok) {
                alert("Error paying: "+response.statusText);
                throw Error(response.statusText);
            }
        });
    }

    render() {
        const rows = this.state.donations;
        const total = this.getTotalAmount();
        const _this = this;
        const centeralign = {textAlign: 'center'};
        return (
            <div>
            <div style={centeralign}>
                <Paper style={paperStyle} zDepth={3}>
                    <h1>Donations Total ${total}</h1>
                    <FloatingActionButton href="/donate/add"
                        backgroundColor={greenA400}>
                        <ContentAdd />
                    </FloatingActionButton>
                    <List>
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
                                primaryText={'$'+d.amount}
                                secondaryText={<p>Testing out this</p>}
                                secondaryTextLines={1}
                            />;
                        })}
                    </List>
                </Paper>
            </div>
            <div className="payNowFooter">
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
            </div>
            </div>
        );
    }
}

export default DonationList;
