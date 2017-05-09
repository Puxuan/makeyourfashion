import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function getPrice(order, spec) {
  return spec.price + (Object.values(order.designs).length * 5);
}

const labelStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

function CartDetail({ cart, specs }) {
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
                  <Link to="/create">编辑</Link>
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

CartDetail.propTypes = {
  cart: PropTypes.object.isRequired,
  specs: PropTypes.object.isRequired,
};

export default connect(state => ({
  cart: state.cart,
  specs: state.entities.specs,
}))(CartDetail);
