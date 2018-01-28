import React from 'react';
import { Provider } from 'react-redux';
import { Router, RouterContext } from 'react-router';
import ContextInjector from './ContextInjector';
import route from './route';

// const isDevelopment = process.env.NODE_ENV === 'development';

const withReduxProvider = (store, children, userDeviceData, accessToken) => {
  const userData = {
    id: 1,
    imageUrl: 'https://placehold.jp/100x100.png',
    fullName: 'shimatomo',
  };
  return (
    <ContextInjector
      dispatch={store.dispatch}
      userData={userData}
    >
      <Provider store={store}>
        {children}
      </Provider>
    </ContextInjector>
  );
};

export const createClientApp = (store, history, userDeviceData, accessToken) =>
  withReduxProvider(
    store,
    (
      <Router history={history}>
        {route}
      </Router>
    ),
    { userDeviceData },
    accessToken,
  );

export const createServerApp = (store, props, userDeviceData, accessToken) =>
  withReduxProvider(store, <RouterContext {...props} />, { userDeviceData }, accessToken);
