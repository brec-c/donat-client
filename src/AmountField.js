import React, {Component} from 'react';

import TextField from 'material-ui/TextField';

class AmountField extends Component {

  formatAsCurrency = () => {
    if (isNaN(this.props.amount)) return;

    var num = Number(this.props.amount).toFixed(2);
    this.props.onChange({}, num);
  }

  render() {
    return (
      <TextField
        hintText="$"
        fullWidth={true}
        type="number"
        name="amount"
        min="1.00" step="0.01"
        value={this.props.amount}
        onChange={this.props.onChange}
        onBlur={this.formatAsCurrency.bind(this)}
        floatingLabelText="Amount to Donate"
      />
    );
  }
}

export default AmountField;
