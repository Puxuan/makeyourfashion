// @flow

import React from 'react';
import { connect } from 'react-redux';
import { values, range } from 'lodash';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { updateCurrentDesign } from '../../action';
import TextEditPanel from './TextEditPanel';

const { func, object } = React.PropTypes;

class OrderForm extends React.Component {
  static propTypes = {
    updateCurrentDesign: func.isRequired,
    specs: object.isRequired,
    currentDesign: object.isRequired,
    error: object.isRequired,
  }

  handleSelectSize = (e, index, text) => {
    this.props.updateCurrentDesign({
      size: text,
    });
  }

  handleSelectQty = (e, index, text) => {
    this.props.updateCurrentDesign({
      qty: +text,
    });
  }

  render() {
    const product = this.props.specs.byIds[this.props.currentDesign.detail.productId];
    const price = product ? product.price + (values(this.props.currentDesign.designs).length * 5) : 0;
    return (
      <div>
        <form className="orderform">
          <div><p className="pricelabel">{`单价：¥ ${price.toFixed(2)}`}</p></div>
          <SelectField
            style={{ width: '120px' }}
            floatingLabelText="数量"
            value={this.props.currentDesign.detail.qty}
            onChange={this.handleSelectQty}
            errorText={this.props.error.qty}
          >
            {
              range(1, 13).map(n => <MenuItem key={n} value={n} primaryText={n} />)
            }
          </SelectField>
          <SelectField
            style={{ width: '120px' }}
            floatingLabelText="尺码"
            value={this.props.currentDesign.detail.size}
            onChange={this.handleSelectSize}
            errorText={this.props.error.size}
          >
            {
              product ? product.sizes.map(n => <MenuItem
                key={n} value={n} primaryText={n}
              />) : null
            }
          </SelectField>
          <TextEditPanel />
        </form>
      </div>
    );
  }
}

export default connect(state => ({
  currentDesign: state.currentDesign,
  specs: state.entities.specs,
  error: state.error.order,
}), dispatch => ({
  updateCurrentDesign(order) {
    dispatch(updateCurrentDesign(order));
  },
}))(OrderForm);
