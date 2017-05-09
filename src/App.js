import React from 'react';
import { Tabs, Tab } from 'react-mdl';
import { Route } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';
import ShoppingCartButton from './components/ShoppingCartButton';

const CreateShirt = asyncComponent({
  resolve: () => System.import('./components/create-shirt'),
});

const Checkout = asyncComponent({
  resolve: () => System.import('./components/checkout'),
});

const Landing = asyncComponent({
  resolve: () => System.import('./components/landing'),
});

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
        <Route exact path="/create" component={CreateShirt} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/" component={Landing} />
      </div>
    </div>
  );
}

export default App;
