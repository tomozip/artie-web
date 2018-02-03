// libs
import { compose, combineReducers, createStore } from 'redux';
import { routerReducer } from 'react-router-redux';
import persistState from 'redux-localstorage';

import { clientAppReducer, serverAppReducer } from './reducers/app';

const rootReducer = isClient => combineReducers({
  app: isClient ? clientAppReducer : serverAppReducer,
  routing: routerReducer,
});

const storageConfig = {
  key: 'redux',
  slicer: paths => state => ({
    app: {
      tokenAuth: state.app.tokenAuth,
    },
  }),
  // initialState = state by fetching in server.js; persistedState = state from localStorage.
  merge: (initialState, persistedState) => Object.assign({}, initialState, {
    app: Object.assign({}, initialState.app, {
      tokenAuth: Object.assign({}, initialState.app.tokenAuth, persistedState.app.tokenAuth),
    }),
  }),
};

// using redux-localstorage as midlware here. https://github.com/elgerlambert/redux-localstorage
const enhancer = compose(persistState('state', storageConfig));

export const configerClientStore = initialState => createStore(
  rootReducer(true),
  initialState,
  enhancer,
);

export const configureServerStore = initialState => createStore(
  rootReducer(false),
  initialState,
);
