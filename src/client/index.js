import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import asyncBootstrapper from 'react-async-bootstrapper';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './Root';

const root = document.querySelector('#root');
injectTapEventPlugin();
const mount = (RootComponent) => {
  const app = (
    <AppContainer>
      <RootComponent />
    </AppContainer>
  );
  asyncBootstrapper(app).then(() => {
    render(app, root);
  });
};


if (module.hot) {
  module.hot.accept('./Root', () => {
    // eslint-disable-next-line global-require,import/newline-after-import
    const RootComponent = require('./Root').default;
    mount(RootComponent);
  });
}

mount(Root);
