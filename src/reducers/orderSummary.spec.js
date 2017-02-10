import { describe, it } from 'mocha';
import { expect } from 'chai';

import { requestOrderSummary, reciveOrdersSummary, raiseOrdersSummaryError, ordersSummaryReducer } from './ordersSummary';

describe('ordersSummary', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      const state = ordersSummaryReducer(undefined, {
        type: 'UNKNOWN_ACTION',
      });

      expect(state).to.eql({
        isFetching: null,
        isError: null,
        data: null,
      })
    });

    it('should update order status state when request order summary', () => {
      ordersSummaryReducer(undefined, {
        type: 'UNKNOWN_ACTION',
      });
      const action = requestOrderSummary();
      const state = ordersSummaryReducer(undefined, action);

      expect(state).to.deep.eql({
        isFetching: true,
        isError: false,
        data: null,
      })
    });

    it('should update order status state when recived order summary', () => {
      ordersSummaryReducer(undefined, {
        type: 'UNKNOWN_ACTION',
      });

      const action = reciveOrdersSummary({
        content: {
          data: 'data'
        }
      });
      const state = ordersSummaryReducer(undefined, action);

      expect(state).to.deep.eql({
        isFetching: false,
        isError: false,
        data: {
          content: {
            data: 'data',
          }
        }
      })
    });

    it('should update order status state when error occure', () => {
      ordersSummaryReducer(undefined, {
        type: 'UNKNOWN_ACTION',
      });
      const action = raiseOrdersSummaryError();
      const state = ordersSummaryReducer(undefined, action);

      expect(state).to.deep.eql({
        isFetching: false,
        isError: true,
        data: null
      });
    });
  });
});
