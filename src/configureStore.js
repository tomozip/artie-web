// libs
import { compose, combineReducers, createStore } from 'redux';
import { routerReducer } from 'react-router-redux';
import persistState from 'redux-localstorage';

import appReducer from './reducers/app';

const rootReducer = combineReducers({
  app: appReducer,
  routing: routerReducer,
});

const storageConfig = {
  key: 'redux',
  slicer: paths => state => ({
    app: {
      tokenAuth: state.app.tokenAuth,
    },
  }),
  merge: (initialState, persistedState) => ({
    app: {
      tokenAuth: Object.assign(initialState.app.tokenAuth, persistedState.app.tokenAuth),
    },
  }),
};

// using redux-localstorage as midlware here. https://github.com/elgerlambert/redux-localstorage
const enhancer = compose(persistState('state', storageConfig));

export const configerClientStore = initialState => createStore(
  rootReducer,
  initialState,
  enhancer,
);

export const configureServerStore = initialState => createStore(
  rootReducer,
  initialState,
);
