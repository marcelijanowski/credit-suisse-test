import { describe, it } from 'mocha';
import { expect } from 'chai';

import { I18nProvider, formatString } from './i18n';

describe('i18n', () => {
  describe('<I18nProvider>', () => {
    it('Returns i81n object in getChildContext', () => {
      const i18nProvider = new I18nProvider({
        locale: 'en-GB',
        strings: {
          foo: 'bar',
        },
      });

      expect(i18nProvider.getChildContext()).to.eql({
        i18n: {
          locale: 'en-GB',
          strings: {
            foo: 'bar',
          },
        },
      });
    });
  });

  describe('formatString()', () => {
    it('should replace placeholders with the given params', () => {
      const result = formatString('Count from ${0} to ${1}', 'one', 'ten');
      expect(result).to.equal('Count from one to ten');
    });

    it('should not modify placeholders if not given any params', () => {
      const result = formatString('Count from ${0} to ${1}');
      expect(result).to.equal('Count from ${0} to ${1}');
    });

    it('should ignore params that don\'t match placeholders', () => {
      const result = formatString('Count from ${0} to ${1}', 'one', 'ten', 'foobar');
      expect(result).to.equal('Count from one to ten');
    });
  });
});
