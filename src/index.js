import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';
import { Router } from 'react-router';

import { routes } from './routes';
import { I18nProvider } from './i18n/i18n';
import languageStrings from './i18n/strings/en-GB';
import configureStore from './stores/configureStore';
import { requestOrderSummary, reciveOrdersSummary, raiseOrdersSummaryError, fetchOrdersSummary } from './reducers/ordersSummary';

import './global/styles/sanitize.css';
import './global/styles/global.css';


// Create a new Redux store
const store = configureStore();

store.dispatch(requestOrderSummary());
fetchOrdersSummary()
  .then(data => {
    store.dispatch(reciveOrdersSummary(data.jsonBody.content));
  })
  .catch(e => {
    store.dispatch(raiseOrdersSummaryError());
  });

// Sync the browser history state with the store
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <I18nProvider locale="en-GB" strings={languageStrings}>
      <Router history={history} routes={routes} />
    </I18nProvider>
  </Provider>,
  document.getElementById('root')
);
