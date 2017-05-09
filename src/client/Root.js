import React from 'react';
import thunk from 'redux-thunk';
import * as Cookies from 'js-cookie';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import 'es6-promise';
import 'isomorphic-fetch';

import { indigo500, indigo700, indigo800 } from 'material-ui/styles/colors';
import { createStore, applyMiddleware } from 'redux';
import App from '../App';
import reducer from '../reducer';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    primary2Color: indigo700,
    primary3Color: indigo800,
    pickerHeaderColor: indigo500,
  },
});
const cart = JSON.parse(localStorage.getItem('myf_cart') || '{}');
const initialState = window.__PRELOADED_STATE__;
initialState.cart = cart;
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk),
);

window.store = store;

let currentDesign;
let currentCart;
store.subscribe(() => {
  const previousDesign = currentDesign;
  const previousCart = currentCart;
  currentDesign = store.getState().currentDesign;
  if (previousDesign !== currentDesign) {
    Cookies.set('currentDesign', JSON.stringify(currentDesign), { expires: 365 });
  }
  currentCart = store.getState().cart;
  if (previousCart !== currentCart) {
    localStorage.setItem('myf_cart', JSON.stringify(currentCart));
  }
});

function Root() {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
}

export default Root;
