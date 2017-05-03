import React from 'react';
import { connect } from 'react-redux';
import { Grid, Cell, Button } from 'react-mdl';
import CreateShirtCanvas from './CreateShirtCanvas';
import LeftPanel from './LeftPanel';
import SelectProduct from './SelectProduct';
import SelectDesign from './SelectDesign';
import OrderForm from './OrderForm';
import { addToCart, updateActiveImage, fetchSpec } from '../../action';

const { func, object } = React.PropTypes;

const imgStyle = { width: '50px', height: '50px', border: '1px solid transparent', marginLeft: '5px', borderRadius: '5%', boxShadow: '0 2px 2px 0 rgba(0,0,0,.11), inset 0 2px 2px 0 rgba(255,255,255,.3)' };

class CreateShirt extends React.Component {
  static propTypes = {
    addToCart: func.isRequired,
    updateActiveImage: func.isRequired,
    fetchSpec: func.isRequired,
    currentDesign: object.isRequired,
    spec: object,
  }

  static defaultProps = {
    spec: {},
  }

  componentDidMount() {
    const productId = this.props.currentDesign.detail.productId;
    if (productId) {
      this.props.fetchSpec(productId);
    }
  }

  handleAddToCard = (e) => {
    e.preventDefault();
    // this.canvas.getWrappedInstance().generateImage().then((imgUrl) => {
    //   this.props.addToCart({
    //     ...this.props.currentDesign,
    //     imgUrl,
    //   });
    // });
    const { detail, designs, texts } = this.props.currentDesign;
    this.props.addToCart({
      ...detail,
      designs,
      texts,
      imgUrl: '//image4.spreadshirtmedia.com/image-server/v1/products/1018088125/views/1?width=120&height=120&appearanceId=228',
    });
  }

  handleSelectImage = (e) => {
    e.preventDefault();
    this.props.updateActiveImage(e.target.closest('a').getAttribute('href'));
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
                this.props.spec ? this.props.spec.pics.map(pic =>
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
          <Button
            onClick={this.handleAddToCard}
            className="actionbutton" accent ripple raised
          >添加到购物车</Button>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  currentDesign: state.currentDesign,
  spec: state.entities.specs.byIds[state.currentDesign.detail.productId],
}), dispatch => ({
  addToCart(order) {
    dispatch(addToCart(order));
  },
  updateActiveImage(id) {
    dispatch(updateActiveImage(id));
  },
  fetchSpec(id) {
    dispatch(fetchSpec(id));
  },
}))(CreateShirt);
