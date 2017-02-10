import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';

import rootReducer from '../reducers';

/**
 * Redux middleware which ignores undefined actions.
 */
const ignoreUndefined = store => next => action => {
  if (typeof action !== 'undefined') {
    return next(action);
  }
};

/**
 * Configures and returns a new Redux store. An optional initial state can be provided to rehydrate
 * the state from storage, or to populate it with mock data in tests.
 * @param  {Object} initialState Optional initial store state
 * @return {Object}              Redux store
 */
function configureStore(initialState = undefined) {
  const middlewares = [
    ignoreUndefined,
    thunk,
    routerMiddleware(hashHistory),
  ];

  // The Redux logger is only added in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger({ collapsed: true }));
  }

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
}

export default configureStore;
