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
};

const enhancer = compose(
  // using redux-localstorage as midlware here. https://github.com/elgerlambert/redux-localstorage
  persistState('state', storageConfig));

const configureStore = initialState => createStore(
  rootReducer,
  initialState,
  enhancer,
);

export default configureStore;
