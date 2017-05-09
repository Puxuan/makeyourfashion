import React from 'react';
import { connect } from 'react-redux';
import { Icon, Badge } from 'react-mdl';
import { map, values, sum, isEmpty } from 'lodash';
import Popover from 'material-ui/Popover';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

const { object } = React.PropTypes;

class ShoppingCartButton extends React.Component {
  static propTypes = {
    cart: object.isRequired,
  }

  state = {
    open: false,
  }

  handleClick = () => {
    this.setState({
      open: true,
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <div
        className="shoppingcart"
        ref={(r) => { this.badge = r; }}
      >
        <Badge
          className="cart-icon"
          onClick={this.handleClick}
          text={sum(map(this.props.cart, order => order.detail.qty))} overlap
        >
          <Icon name="shopping_cart" />
        </Badge>
        <Popover
          autoCloseWhenOffScreen={false}
          style={{ maxWidth: '100%' }}
          open={this.state.open}
          anchorEl={this.badge}
          onRequestClose={this.handleRequestClose}
        >
          {
            isEmpty(this.props.cart) ? <p>您的购物车为空</p> : <div>
              {values(this.props.cart).map(order => <CartItem key={order.id} orderId={order.id} />)}
              <div className="actionsection">
                <Link
                  onClick={this.handleRequestClose}
                  to="/checkout"
                  className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--accent"
                >结账</Link>
              </div>
            </div>
          }
        </Popover>
      </div>
    );
  }
}

export default connect(state => ({
  cart: state.cart,
}))(ShoppingCartButton);
