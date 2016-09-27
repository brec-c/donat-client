import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class SuccessDialog extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const actions = [
      <FlatButton
          label="OK"
        primary={true}
        onTouchTap={this.props.onClose}
    />];
    return (
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.successOpen}
          onRequestClose={this.props.onClose}
        >
          <h1>Paid!</h1>
          <strong>Thank you.</strong>  <p>An email should be on its way to you now with a receipt for your donation.</p>
        </Dialog>
    );
  }
}

export default SuccessDialog;
