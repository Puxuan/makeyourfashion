import React from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';
import { withRouter } from 'react-router';

class ProductCard extends React.Component {
  handleProductSelect = () => {
    this.props.history.push(`/create?product=${this.props.product.id}`);
  }

  render() {
    return (
      <Card className="product-card" onClick={this.handleProductSelect}>
        <CardMedia
          overlay={<CardTitle style={{ padding: '0' }} titleStyle={{ fontSize: '1.2em', textAlign: 'center' }} title={this.props.product.name} />}
        >
          <img alt={this.props.product.name} src={this.props.product.imgUrl} />
        </CardMedia>
      </Card>
    );
  }
}

export default withRouter(ProductCard);
