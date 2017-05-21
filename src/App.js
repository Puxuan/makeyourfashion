import React from 'react';
import { Route, Link } from 'react-router-dom';
import ShoppingCartButton from './components/ShoppingCartButton';
import Landing from './components/landing';
import CreateShirt from './components/create-shirt';
import Checkout from './components/checkout';
import Shop from './components/shop';

function App() {
  return (
    <div>
      <div className="header mdl-tabs mdl-js-tabs is-upgraded">
        <Link
          className={`mdl-tabs__tab header-tab ${
           typeof window !== 'undefined' && window.location.pathname.startsWith('/shop') ? 'is-active' : ''
          }`}
          to="/shop/2"
        >购物</Link>
        <Link
          to="/create"
          className={`mdl-tabs__tab header-tab ${
            typeof window !== 'undefined' && window.location.pathname.startsWith('/create') ? 'is-active' : ''
          }`}
        >设计</Link>
        <Link
          to="/sell"
          className={`mdl-tabs__tab header-tab ${
            typeof window !== 'undefined' && window.location.pathname.startsWith('/sell') ? 'is-active' : ''
          }`}
        >销售</Link>
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
