import React from 'react';
import { Tabs, Tab, Card, CardTitle, CardActions } from 'react-mdl';
import { connect } from 'react-redux';
import { values } from 'lodash';
import {
  toggleProductModel,
  selectProduct,
  fetchCategory,
  fetchSpec,
  fetchCategories,
  setActiveCategory,
  setActiveSubCategory,
} from '../../action';
import Modal from '../Modal';
import TagIcon from './TagIcon';

@connect(null, dispatch => ({
  selectProduct(order) {
    dispatch(selectProduct(order));
  },
  toggleProductModel(flag) {
    dispatch(toggleProductModel(flag));
  },
  fetchSpec(id) {
    dispatch(fetchSpec(id));
  },
}))
class ProductCard extends React.Component {
  handleProductSelect = () => {
    const id = this.props.product.id;
    this.props.selectProduct(id);
    this.props.fetchSpec(id);
    this.props.toggleProductModel(false);
  }

  render() {
    const { product } = this.props;
    return (
      <Card
        onClick={this.handleProductSelect}
        shadow={0}
        className="productcard"
        style={{ background: `url(${product.imgUrl}) center / cover` }}
      >
        <CardTitle expand />
        <CardActions className="cardacton">
          <span>{product.name}</span>
        </CardActions>
      </Card>
    );
  }
}

@connect(state => ({
  open: state.ui.createOrder.isProductModelOpen,
  categories: state.entities.categories.byIds,
  activeCategory: state.ui.createOrder.activeCategory,
  activeSubCategory: state.ui.createOrder.activeSubCategory,
  subCategories: state.entities.subCategories,
  products: state.entities.products,
  currentDesign: state.currentDesign,
}), dispatch => ({
  toggleProductModel(flag) {
    dispatch(toggleProductModel(flag));
  },
  fetchCategory(id) {
    dispatch(fetchCategory(id));
  },
  fetchCategories() {
    dispatch(fetchCategories());
  },
  setActiveCategory(id) {
    dispatch(setActiveCategory(id));
  },
  setActiveSubCategory(id) {
    dispatch(setActiveSubCategory(id));
  },
}))
export default class SelectProduct extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  handleTabChange = (e) => {
    const catId = e.target.getAttribute('data-catagory-id');
    this.props.setActiveCategory(catId);
    this.props.fetchCategory(catId);
  }

  handleSubCategoryChange = (value) => {
    this.props.setActiveSubCategory(value);
  }

  handleToggleProductModel = () => {
    this.props.toggleProductModel(false);
  }

  render() {
    const categories = values(this.props.categories);
    const products = this.props.products;
    const activeProducts = (products.byCategories[this.props.activeSubCategory || this.props.activeCategory] || [])
      .map(id => products.byIds[id]);
    const isProductPresent = this.props.currentDesign.detail.productId !== null
      && this.props.currentDesign.detail.productId !== undefined;
    const open = !isProductPresent || this.props.open;
    const subCategories = (this.props.subCategories.byCategories[this.props.activeCategory] || [])
      .map(id => this.props.subCategories.byIds[id]);

    return (
      <Modal hideClose={!isProductPresent} onCloseModal={this.handleToggleProductModel} open={open}>
        <Tabs onClick={this.handleTabChange}>
          {
            categories.map(category => <Tab key={category.id} data-catagory-id={category.id}>
              {category.name}
            </Tab>)
          }
        </Tabs>
        <div style={{ display: 'flex', marginTop: '10px' }}>
          {
            subCategories.map(
              sub => <TagIcon
                isActive={this.props.activeSubCategory === sub.id}
                key={sub.id} onClick={this.handleSubCategoryChange}
                value={sub.id}
              >{sub.name}</TagIcon>,
            )
          }
        </div>
        <div className="flexlist">
          {
            activeProducts.map(product => <ProductCard
              key={product.id} product={product}
            />)
          }
        </div>
      </Modal>
    );
  }
}
