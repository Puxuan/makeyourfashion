import React from 'react';
import express from 'express';
import { keyBy } from 'lodash';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderToString } from 'react-dom/server';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { indigo500, indigo700, indigo800 } from 'material-ui/styles/colors';
import asyncBootstrapper from 'react-async-bootstrapper';
import { StaticRouter } from 'react-router';
import App from '../../App';
import reducer from '../../reducer';
import template from '../template';
import { getSpec } from '../client';

const clientAssets = require(KYT.ASSETS_MANIFEST);
const router = express.Router();

function getState(currentDesign = { detail: {}, texts: {}, designs: {} }, catalogs = {}, spec = {}) {
  const specByIds = spec.id ? {
    [spec.id]: spec,
  } : {};
  return {
    entities: {
      products: {
        byIds: {},
      },
      specs: {
        byIds: specByIds,
      },
      designs: {
        byIds: {},
      },
      tags: {
        byIds: {},
        allIds: [],
      },
      categories: {
        byIds: keyBy(catalogs, 'id'),
      },
      subCategories: {
        byIds: {},
        byCategories: {},
      },
    },
    address: {},
    currentDesign,
    ui: {
      createOrder: {
        isProductModelOpen: false,
        isDesignModelOpen: false,
        showTextSettings: false,
        showTextEdit: false,
        editable: true,
        activeCategory: null,
        activeSubCategory: null,
        activeImageId: spec.pics ? spec.pics[0].id : null,
        showAddToCartSuccess: false,
      },
    },
    fetchStatus: {
      isFetchingProduct: false,
      isFetchingDesign: false,
      isFetchingTag: false,
      categoryFetched: false,
    },
    cart: {},
    error: {
      cart: {},
      order: {},
    },
  };
}

function renderHtml(req, initialState) {
  const store = createStore(reducer, initialState);
  const muiTheme = getMuiTheme({
    palette: {
      primary1Color: indigo500,
      primary2Color: indigo700,
      primary3Color: indigo800,
      pickerHeaderColor: indigo500,
    },
    userAgent: req.headers['user-agent'],
  });
  const reactApp = (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={{}}
        >
          <App />
        </StaticRouter>
      </Provider>
    </MuiThemeProvider>
  );
  return asyncBootstrapper(reactApp).then(() => template({
    root: renderToString(reactApp),
    state: initialState,
    jsBundle: clientAssets.main.js,
    cssBundle: clientAssets.main.css,
  }));
}

router.get('/create', (req, res) => {
  let specPromise;
  let design;
  if (req.cookies.currentDesign) {
    design = JSON.parse(req.cookies.currentDesign);
    if (design.detail.productId !== null && design.detail.productId !== undefined) {
      specPromise = getSpec(design.detail.productId);
    } else {
      specPromise = Promise.resolve({});
    }
  } else {
    specPromise = Promise.resolve({});
  }
  specPromise.then((spec) => {
    const initialState = getState(design, {}, spec);
    renderHtml(req, initialState).then((html) => {
      res.send(html);
    });
  }).catch((e) => {
    console.error(e.stack);
    res.json(e);
  });
});

router.get('/checkout', (req, res) => {
  let specPromise;
  let design;
  if (req.cookies.currentDesign) {
    design = JSON.parse(req.cookies.currentDesign);
    if (design.detail.productId !== null && design.detail.productId !== undefined) {
      specPromise = getSpec(design.detail.productId);
    } else {
      specPromise = Promise.resolve({});
    }
  } else {
    specPromise = Promise.resolve({});
  }
  specPromise.then((spec) => {
    const initialState = getState(design, {}, spec);
    renderHtml(req, initialState).then((html) => {
      res.send(html);
    });
  }).catch((e) => {
    console.error(e.stack);
    res.json(e);
  });
});

router.get('/', (req, res) => {
  let design;
  if (req.cookies.currentDesign) {
    design = JSON.parse(req.cookies.currentDesign);
  }
  const initialState = getState(design, {});
  renderHtml(req, initialState).then((html) => {
    res.send(html);
  });
});

export default router;
