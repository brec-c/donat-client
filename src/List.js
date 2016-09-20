import React, {Component} from 'react';

import Paper                from 'material-ui/Paper';
import RaisedButton         from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd           from 'material-ui/svg-icons/content/add';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400} from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import StripeCheckout from 'react-stripe-checkout';

import store from 'store';

const paperStyle = {
  maxHeight: 800,
  width: 800,
  margin: 20,
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

// const rightIconMenu = (
//   <IconMenu iconButtonElement={iconButtonElement}>
//     <MenuItem onTouchTap={function(){console.log("test1");}} value={d.key}>Edit</MenuItem>
//     <MenuItem value={d.key}>Delete</MenuItem>
//   </IconMenu>
// );

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

    onToken = (token) => {
        fetch('/charge', {
            method: 'POST',
            body: JSON.stringify(token)
        }).then(token => {
            alert(`We are in business, ${token.email}`);

            // if successful, clear donationBundle
        });
    }

    render() {
        const rows = this.state.donations;
        const total = rows.reduce(function(total, val){ return total + val.amount; }, 0);
        const _this = this;
        return (
            <div>
                <Paper style={paperStyle} zDepth={3}>
                    <h1>Total ${total}</h1>
                    <FloatingActionButton href="/donate/add">
                        <ContentAdd />
                    </FloatingActionButton>
                    <List>
                        <Subheader>Donations</Subheader>
                        {rows.map(function(d){
                            return <ListItem
                                key={d.key}
                                leftIcon={<FontIcon className="material-icons">
                                    {d.studentName ? 'face' : 'school'}
                                </FontIcon>}
                                rightIconButton={<IconMenu iconButtonElement={iconButtonElement}>
                                  <MenuItem onTouchTap={function(){_this.onEdit(d.key)}}>Edit</MenuItem>
                                  <MenuItem onTouchTap={function(){_this.onDelete(d.key)}}>Delete</MenuItem>
                                </IconMenu>}
                                primaryText={d.amount}
                                secondaryText={<p>Testing out this</p>}
                                secondaryTextLines={2}
                            />;
                        })}
                    </List>
                </Paper>

                <StripeCheckout
                    token={this.onToken}
                    stripeKey="pk_test_LfX4pdpuTU5cBcy35taA7f0D"
                >
                    <RaisedButton label="Pay Now" secondary={true}/>
                </StripeCheckout>
            </div>
        );
    }
}

export default DonationList;
