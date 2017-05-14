import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { editCartItem } from '../../action';

function getPrice(order, spec) {
  return spec.price + (Object.values(order.designs).length * 5);
}

const labelStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

class CartDetail extends React.Component {
  static propTypes = {
    cart: PropTypes.object.isRequired,
    specs: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    editCartItem: PropTypes.func.isRequired,
  }

  editOrder = (e) => {
    e.preventDefault();
    this.props.editCartItem(e.target.getAttribute('data-order-id'));
    this.props.history.push('/create');
  }

  render() {
    const { cart, specs } = this.props;
    return (
      <div>
        <div style={labelStyle}>
          <div className="pricelabel">商品总价：</div>
          <div className="pricelabel">￥50</div>
        </div>
        <div style={labelStyle}>
          <div className="pricelabel">运费：</div>
          <div className="pricelabel">￥0</div>
        </div>
        <hr />
        <div style={labelStyle}>
          <div className="pricelabel">总计：</div>
          <div className="pricelabel">￥50</div>
        </div>
        <hr />
        {
          Object.values(cart).map((order) => {
            const spec = specs.byIds[order.detail.productId];
            return (
              <div key={order.id} className="cartitem">
                <img alt="product" height={200} width={200} className="img" src={order.imgUrl} />
                <div className="description">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h6>{spec.name}</h6>
                    <Link data-order-id={order.id} onClick={this.editOrder} to="/create">编辑</Link>
                  </div>
                  <p className="pricelabel">{`¥ ${(getPrice(order, spec) * order.detail.qty).toFixed(2)}`}</p>
                  <div>
                    <p className="pricelabel">数量：{order.detail.qty}</p>
                  </div>
                  <div>
                    <p className="pricelabel">尺码：{order.detail.size}</p>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  cart: state.cart,
  specs: state.entities.specs,
}), dispatch => ({
  editCartItem(id) {
    dispatch(editCartItem(id));
  },
}))(CartDetail));
