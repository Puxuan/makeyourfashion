import React from 'react';
import { Route, Link } from 'react-router-dom';
import ShoppingCartButton from './components/ShoppingCartButton';
import Landing from './components/landing';
import CreateShirt from './components/create-shirt';
import Checkout from './components/checkout';
import Shop from './components/shop';

// const Landing = require('./components/landing');

function App() {
  return (
    <div>
      <div className="header mdl-tabs mdl-js-tabs is-upgraded">
        <Link className="mdl-tabs__tab header-tab" to="/shop/all">购物</Link>
        <Link className="mdl-tabs__tab header-tab" to="/create">设计</Link>
        <Link className="mdl-tabs__tab header-tab" to="/sell">销售</Link>
        {/*<Tabs activeTab={1}>
          <Tab className="header-tab"><Link to="/shop/all">购物</Link></Tab>
          <Tab className="header-tab">设计</Tab>
          <Tab className="header-tab">销售</Tab>
        </Tabs>*/}
        <ShoppingCartButton className="shopping-cart-icon" />
      </div>
      <div className="main-content" >
        <Route exact path="/" component={Landing} />
        <Route exact path="/create" component={CreateShirt} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/shop/:category" component={Shop} />
      </div>
    </div>
  );
}

export default App;
