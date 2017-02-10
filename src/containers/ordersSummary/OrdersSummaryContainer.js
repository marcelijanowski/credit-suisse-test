
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import './OrdersSummaryContainer.css';

export const OrdersSummaryContainer = ({ orders }, context) => {
  const { strings } = context.i18n;
  if (orders.isFetching) {
    return (<div>{strings.ordersSummary.fetching}</div>);
  }
  if (orders.isError) {
    return (<div>{strings.ordersSummary.error}</div>);
  }
  if(orders.data) {
    return (
      <table>
  	     <thead>
  	        <tr>
          		<th>{strings.ordersSummary.orderDate}</th>
          		<th>{strings.ordersSummary.deliveryCountry}</th>
          		<th>{strings.ordersSummary.manufacturer}</th>
              <th>{strings.ordersSummary.gende}</th>
              <th>{strings.ordersSummary.size}</th>
              <th>{strings.ordersSummary.colour}</th>
              <th>{strings.ordersSummary.style}</th>
              <th>{strings.ordersSummary.count}</th>
          	</tr>
  	      </thead>
  	       <tbody>
            {orders.data.map((order, key) => (
            	<tr key={key}>
            		<td>{order.orderData}</td>
            		<td>{order.deliveryCountry}</td>
            		<td>{order.manufacturer}</td>
                <td>{order.gende}</td>
                <td>{order.size}</td>
                <td>{order.colour}</td>
                <td>{order.style}</td>
                <td>{order.count}</td>
            	</tr>
            ))}
  	     </tbody>
       </table>
    );
  } else
    return null;
};

OrdersSummaryContainer.propTypes = {
  orders: PropTypes.object,
};

OrdersSummaryContainer.contextTypes = {
  i18n: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    orders: state.orders,
  };
};

export default connect(mapStateToProps)(OrdersSummaryContainer);
