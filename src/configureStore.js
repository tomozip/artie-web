import { combineReducers, createStore } from 'redux';
import { routerReducer } from 'react-router-redux';
import appReducer from './reducers/app';

const rootReducer = combineReducers({
  app: appReducer,
  routing: routerReducer,
});

const configureStore = initialState => createStore(
  rootReducer,
  initialState,
);

export default configureStore;
