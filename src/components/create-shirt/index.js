import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Cell, Button } from 'react-mdl';
import Snackbar from 'material-ui/Snackbar';
import CreateShirtCanvas from './CreateShirtCanvas';
import LeftPanel from './LeftPanel';
import SelectProduct from './SelectProduct';
import SelectDesign from './SelectDesign';
import OrderForm from './OrderForm';
import { getQueryString } from '../../utils';
import {
  addToCart,
  updateActiveImage,
  fetchSpec,
  updateCartItem,
  resetCreateOrderState,
  hideAddToCartSuccess,
  selectProduct,
} from '../../action';

const { func, object, bool } = React.PropTypes;

const imgStyle = { width: '50px', height: '50px', border: '1px solid transparent', marginLeft: '5px', borderRadius: '5%', boxShadow: '0 2px 2px 0 rgba(0,0,0,.11), inset 0 2px 2px 0 rgba(255,255,255,.3)' };

class CreateShirt extends React.Component {
  static propTypes = {
    addToCart: func.isRequired,
    updateCart: func.isRequired,
    updateActiveImage: func.isRequired,
    fetchSpec: func.isRequired,
    reset: func.isRequired,
    currentDesign: object.isRequired,
    showAddToCartSuccess: bool.isRequired,
    spec: object,
    history: object.isRequired,
    selectProduct: func.isRequired,
    hideAddToCartSuccess: func.isRequired,
  }

  static defaultProps = {
    spec: {},
  }

  componentDidMount() {
    const newProductId = getQueryString(this.props.location.search).product;
    let productId = this.props.currentDesign.detail.productId;
    if (newProductId && newProductId !== productId) {
      this.props.selectProduct(newProductId);
      productId = newProductId;
    }
    if (productId) {
      this.props.fetchSpec(productId);
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  handleAddToCard = (e) => {
    e.preventDefault();
    this.canvas.getWrappedInstance().generateImage().then((imgUrl) => {
      this.props.addToCart({
        ...this.props.currentDesign,
        imgUrl,
      });
    });
  }

  handleUpdateCart = (e) => {
    e.preventDefault();
    this.canvas.getWrappedInstance().generateImage().then((imgUrl) => {
      this.props.updateCart({
        ...this.props.currentDesign,
        id: this.props.currentDesign.detail.cartId,
        imgUrl,
      });
    });
  }

  handleSelectImage = (e) => {
    e.preventDefault();
    this.props.updateActiveImage(e.target.closest('a').getAttribute('href'));
  }

  handleCheckout = () => {
    this.props.history.push('/checkout');
  }

  hideAddToCartSuccess = () => {
    this.props.hideAddToCartSuccess();
  }

  render() {
    return (
      <div>
        <SelectProduct />
        <SelectDesign />
        <Grid className="container">
          <Cell col={3}>
            <LeftPanel />
          </Cell>
          <Cell col={6}>
            <CreateShirtCanvas
              ref={(r) => { this.canvas = r; }}
            />
            <div style={{ marginTop: '10px' }}>
              {
                this.props.spec.pics ? this.props.spec.pics.map(pic =>
                  <a key={pic.id} onClick={this.handleSelectImage} href={pic.id}>
                    <img src={pic.smallUrl} alt="small" style={imgStyle} />
                  </a>) : null
              }
            </div>
          </Cell>
          <Cell col={3}>
            <OrderForm />
          </Cell>
        </Grid>
        <div className="actionarea">
          {
            this.props.currentDesign.detail.cartId ? <Button
              onClick={this.handleUpdateCart}
              className="actionbutton" accent ripple raised
            >更新购物车</Button> : <Button
              onClick={this.handleAddToCard}
              className="actionbutton" accent ripple raised
            >添加到购物车</Button>
          }
        </div>
        <Snackbar
          open={this.props.showAddToCartSuccess}
          onRequestClose={this.hideAddToCartSuccess}
          action="结账"
          message="成功添加至购物车"
          autoHideDuration={4000}
          onActionTouchTap={this.handleCheckout}
        />
      </div>
    );
  }
}

export default withRouter(connect(state => ({
  currentDesign: state.currentDesign,
  showAddToCartSuccess: state.ui.createOrder.showAddToCartSuccess,
  spec: state.entities.specs.byIds[state.currentDesign.detail.productId],
}), dispatch => ({
  addToCart(order) {
    dispatch(addToCart(order));
  },
  selectProduct(order) {
    dispatch(selectProduct(order));
  },
  updateCart(order) {
    dispatch(updateCartItem(order));
  },
  updateActiveImage(id) {
    dispatch(updateActiveImage(id));
  },
  fetchSpec(id) {
    dispatch(fetchSpec(id));
  },
  reset() {
    dispatch(resetCreateOrderState);
  },
  hideAddToCartSuccess() {
    dispatch(hideAddToCartSuccess);
  },
}))(CreateShirt));
