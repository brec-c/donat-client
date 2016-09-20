import React, {Component} from 'react';

import RaisedButton         from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd           from 'material-ui/svg-icons/content/add';

import StripeCheckout from 'react-stripe-checkout';

import store from 'store';

class DonationList extends Component {
    constructor(props, context) {
        super(props, context);

        // this.handleTouchTap = this.handleTouchTap.bind(this);

        this.data = store.get('donationBundle');
    }

    onToken = (token) => {
        fetch('/charge', {
            method: 'POST',
            body: JSON.stringify(token)
        }).then(token => {
            alert(`We are in business, ${token.email}`);
        });
    }

    render() {
        return (
            <div>
                <h1>Material UI Test</h1>

                    <FloatingActionButton href="/add">
                        <ContentAdd />
                    </FloatingActionButton>

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
