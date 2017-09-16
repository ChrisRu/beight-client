import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reducers from '@/reducers';

const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({ ...reducers, router: routerReducer }),
  applyMiddleware(middleware)
);

export default store;
