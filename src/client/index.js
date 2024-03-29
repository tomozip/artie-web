// libs
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import ReactModal from 'react-modal';
// import es6Promise from 'es6-promise';

import { createClientApp } from '../createApp';
import { configerClientStore } from '../configureStore';
// import { getLanguage } from './locale';
// import GoogleAnalyticsUtil from '../utils/GoogleAnalyticsUtil';

// es6Promise.polyfill();

// Grab the state from a global variable injected into the server-generated HTML.
const preloadedState = window.__PRELOADED_STATE__;
const accessToken = window.__ACCESS_TOKEN__;

// Allow the passed state to be garbage-collected.
delete window.__PRELOADED_STATE__;
delete window.__ACCESS_TOKEN__;

// Check authentication and udpate tokenAuth data in localStorage
// const persistState = JSON.parse(window.localStorage.redux).app.tokenAuth.currentUser
// if (persistState.accessToken) {
//   RootRepository(window).tokenAuth.check();
// }
// window.localStorage.setItem('redux', )

// Create Redux store with initial state.
const store = configerClientStore(preloadedState);

const synced = syncHistoryWithStore(browserHistory, store);

// browserHistory.listen((location) => {
//   return new GoogleAnalyticsUtil().trackPageview(location.pathname);
// });

const userDeviceData = {
  // language: getLanguage(),
  // userAgent: navigator.userAgent,
};

ReactModal.setAppElement('#root');

render(
  createClientApp(store, synced, userDeviceData, accessToken),
  document.getElementById('root'),
);
