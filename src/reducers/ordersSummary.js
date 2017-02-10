import Immutable from 'seamless-immutable';

import { fetchJson } from '../utils/fetchUtils';
export const REQUEST_ORDERS_SUMMARY = 'REQUEST_ORDERS_SUMMARY'
export const RECEIVE_ORDERS_SUMMARY = 'RECEIVE_ORDERS_SUMMARY'
export const ERROR_ORDERS_SUMMARY = 'ERROR_ORDERS_SUMMARY';

export const fetchOrdersSummary = () => {
  const orderSummaryEndpoint = '/static/data/ordersSummary.json'

  return fetchJson(orderSummaryEndpoint).then(resp => {
    if (resp.status === 200) {
      return resp;
    } else {
      throw new Error(`unexpected status code (${resp.status})`);
    }
  });
};

const initialState = Immutable.from({
  isFetching: null,
  isError: null,
  data: null,
});


export const requestOrderSummary = () => ({
  type: REQUEST_ORDERS_SUMMARY,
  data: {
    isFetching: true,
    isError: false,
    data: null,
  }
});

export const reciveOrdersSummary = data => ({
  type: RECEIVE_ORDERS_SUMMARY,
  data: {
    isFetching: false,
    isError: false,
    data,
  }
});

export const raiseOrdersSummaryError = () => ({
  type: ERROR_ORDERS_SUMMARY,
  data: {
    isFetching: false,
    isError: true,
    data: null
  }
});

export const ordersSummaryReducer = (state = initialState, action) => {
    switch (action.type) {
      case REQUEST_ORDERS_SUMMARY:
        return action.data;
      case RECEIVE_ORDERS_SUMMARY:
        return action.data;
      case ERROR_ORDERS_SUMMARY:
        return action.data;
      default:
        return state;
  }
};
