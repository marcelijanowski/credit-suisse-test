import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import { spy } from 'sinon';

import { fetchJson } from './fetchUtils';

describe('fetchUtils', () => {
  beforeEach(() => {
    // Mock the fetch function on the global object, which is the equivalent of window in Node
    global.fetch = () => {
      return Promise.resolve({
        json: () => Promise.resolve({ foobar: true }),
      });
    };

    spy(global, 'fetch');
  });

  afterEach(() => {
    global.fetch = undefined;
  });

  describe('fetchJson()', done => {
    it('should add default headers to the fetch call', () => {
      const expectedHeaders = {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      };

      fetchJson('https://foo').then(response => {
        expect(global.fetch.calledWith('https://foo', expectedHeaders)).to.be.true;
        done();
      });
    });

    it('should add custom headers to the default ones', done => {
      const customHeaders = {
        foo: 'bar',
        headers: {
          'qux': 'baz',
        },
      };

      const expectedHeaders = {
        credentials: 'include',
        foo: 'bar',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'qux': 'baz',
        },
      };

      fetchJson('https://foo', customHeaders).then(response => {
        expect(global.fetch.calledWith('https://foo', expectedHeaders)).to.be.true;
        done();
      });
    });

    it('should call json() and add the result to the response object', done => {
      fetchJson('https://foo').then(response => {
        expect(response.jsonBody).to.eql({ foobar: true });
        done();
      });
    });
  });
});
