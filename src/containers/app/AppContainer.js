/*eslint no-empty-pattern: "off"*/
import React, { PropTypes } from 'react';

import OrdersSummaryContainer from '../ordersSummary/OrdersSummaryContainer'
import './AppContainer.css';

/**
 * Main app container
 */
const AppContainer = ({}, context) => {
  const { strings } = context.i18n;
  return (
    <div>
      <h4>{strings.ordersSummary.title}</h4>
      <OrdersSummaryContainer />
    </div>
  )
};

AppContainer.contextTypes = {
  i18n: PropTypes.object,
  router: PropTypes.object,
  store: PropTypes.object,
};

export default AppContainer;
