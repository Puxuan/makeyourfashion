import React from 'react';
import { connect } from 'react-redux';
import { Grid, Cell } from 'react-mdl';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import {
  fetchCategories,
  fetchCategory,
} from '../../action';

const labelStyle = { fontWeight: 'bold', fontSize: '1.1em' };

@connect(state => ({
  categories: state.entities.categories,
  subCategories: state.entities.subCategories,
  products: state.entities.products,
}), dispatch => ({
  fetchCategories() {
    dispatch(fetchCategories());
  },
  fetchCategory(id) {
    dispatch(fetchCategory(id));
  },
}))
export default class Shop extends React.Component {
  state = {
    subCat: null,
  }

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchCategory(this.props.match.params.category);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.category !== this.props.match.params.category) {
      this.props.fetchCategory(nextProps.match.params.category);
      this.setState({
        subCat: null,
      });
    }
  }

  handleSelectSubCat = (e) => {
    e.preventDefault();
    this.setState({
      subCat: e.target.getAttribute('data-catId'),
    });
  }

  render() {
    const category = this.props.categories.byIds[this.props.match.params.category];
    if (!category) {
      return null;
    }
    const productMap = this.props.products;
    let products;
    if (this.state.subCat) {
      products = (productMap.byCategories[this.state.subCat] || []).map(id => productMap.byIds[id]);
    } else {
      products = (productMap.byCategories[category.id] || []).map(id => productMap.byIds[id]);
    }

    const subCatMap = this.props.subCategories;
    const subCategories = (subCatMap.byCategories[category.id] || []).map(id => subCatMap.byIds[id]);
    return (
      <div className="container">
        <h1>{category.name}</h1>
        <Grid>
          <Cell col={2}>
            <div style={labelStyle}>类别</div>
            <ul>
              {
                Object.values(this.props.categories.byIds).map(cat => (
                  <li key={cat.id}>
                    <Link
                      style={{ textDecoration: 'none', color: `${cat.name === category.name ? '#00b2a6' : '#737373'}` }}
                      to={`/shop/${cat.id}`}
                    >{cat.name}</Link>
                  </li>
                ))
              }
            </ul>
            <div style={labelStyle}>过滤器</div>
            <ul>
              {
                subCategories.map(cat => (
                  <li key={cat.id}>
                    <Link
                      style={{ textDecoration: 'none', color: `${cat.id.toString() === this.state.subCat ? '#00b2a6' : '#737373'}` }}
                      to={`/shop/${cat.id}`}
                      data-catId={cat.id}
                      onClick={this.handleSelectSubCat}
                    >{cat.name}</Link>
                  </li>
                ))
              }
            </ul>
          </Cell>
          <Cell col={10}>
            <div className="flexlist">
              {
                products.map(product => <ProductCard
                  key={product.id} product={product}
                />)
              }
            </div>
          </Cell>
        </Grid>
      </div>
    );
  }
}
