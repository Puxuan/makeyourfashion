import React from 'react';
import { Tabs, Tab } from 'react-mdl';
import { Route } from 'react-router-dom';
import ShoppingCartButton from './components/ShoppingCartButton';
import Landing from './components/landing';
import CreateShirt from './components/create-shirt';
import Checkout from './components/checkout';

// const Landing = require('./components/landing');

function App() {
  return (
    <div>
      <div className="header">
        <Tabs activeTab={1}>
          <Tab className="header-tab">购物</Tab>
          <Tab className="header-tab">设计</Tab>
          <Tab className="header-tab">销售</Tab>
        </Tabs>
        <ShoppingCartButton className="shopping-cart-icon" />
      </div>
      <div className="main-content" >
        <Route exact path="/" component={Landing} />
        <Route exact path="/create" component={CreateShirt} />
        <Route exact path="/checkout" component={Checkout} />
      </div>
    </div>
  );
}

export default App;
