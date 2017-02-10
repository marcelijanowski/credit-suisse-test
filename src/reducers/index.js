import { combineReducers } from 'redux';
import { ordersSummaryReducer } from './ordersSummary';
import { routerReducer } from 'react-router-redux';

/**
 * Special action that purges all redux data and reverts to the initial state
 */
export const purgeReduxState = data => ({ type: 'PURGE_REDUX_STATE', data });

// The top-level Redux reducer
const appReducer = combineReducers({
  routing: routerReducer,
  orders: ordersSummaryReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'PURGE_REDUX_STATE') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
