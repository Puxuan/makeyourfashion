// @flow

import React from 'react';
import { connect } from 'react-redux';
import { values, range } from 'lodash';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { updateCartItem, removeItemFromCart } from '../action';

const style = {
  width: 100,
};


class CartItem extends React.Component {
  getPrice() {
    const order = this.props.cart[this.props.orderId];
    return this.props.specs.byIds[order.productId].price + (values(order.designs).length * 5);
  }

  props: {
    products: any,
    cart: any,
    orderId: string,
    removeItemFromCart: (orderId: string) => void,
    updateCartItem: (cart: any) => void,
    error: any,
  }

  handleSelectQty = (e, index, qtyString) => {
    const qty = +qtyString;
    if (qty === 0) {
      this.props.removeItemFromCart(this.props.orderId);
    }

    this.props.updateCartItem({
      ...this.props.cart[this.props.orderId],
      qty: +qty,
    });
  }

  handleSelectSize = (e, index, size) => {
    this.props.updateCartItem({
      ...this.props.cart[this.props.orderId],
      size,
    });
  }

  render() {
    const order = this.props.cart[this.props.orderId];
    const spec = this.props.specs.byIds[order.productId];
    const error = this.props.error[order.id] || {};
    return spec ? (
      <div>
        <div className="cartitem">
          <img alt="product" height={200} width={200} className="img" src={order.imgUrl} />
          <div className="description">
            <h6>{spec.name}</h6>
            <div><p className="pricelabel">{`¥ ${(this.getPrice() * order.qty).toFixed(2)}`}</p></div>
            <div>
              <SelectField
                style={style}
                floatingLabelText="数量"
                value={order.qty}
                onChange={this.handleSelectQty}
                error={error.qty}
              >
                {
                  range(0, 13).map(n => <MenuItem key={n} value={n} primaryText={n.toString()} />)
                }
              </SelectField>
            </div>
            <div>
              <SelectField
                style={style}
                floatingLabelText="尺码"
                value={order.size}
                onChange={this.handleSelectSize}
                errorText={error.size}
              >
                {
                  spec.sizes.map(n => <MenuItem value={n} primaryText={n} />)
                }
              </SelectField>
            </div>
          </div>
        </div>
        <hr />
      </div>
    ) : null;
  }
}

export default connect(state => ({
  cart: state.cart,
  specs: state.entities.specs,
  error: state.error.cart,
}), dispatch => ({
  removeItemFromCart(id) {
    dispatch(removeItemFromCart(id));
  },
  updateCartItem(order) {
    dispatch(updateCartItem(order));
  },
}))(CartItem);
