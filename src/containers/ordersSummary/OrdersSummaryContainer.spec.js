import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { describe, it } from 'mocha';
import { OrdersSummaryContainer } from './OrdersSummaryContainer';
import languageStrings from '../../i18n/strings/en-GB';

describe('<OrdersSummaryContainer />', () => {
  describe('Shallow render', () => {
    it('should render information when fetching orders', () => {
      const props = {
        orders: {
          isFetching: true,
          data: null,
          isError: false,
        }
      };

      const wrapper = shallow(
        <OrdersSummaryContainer {...props} />, {
          context: {
            i18n: {
              strings: languageStrings,
            },
          },
        }
      );
      expect(wrapper.containsMatchingElement(<div>Fetching new data</div>)).to.equal(true);
    });

    it('should render information when error occurred', () => {
      const props = {
        orders: {
          isFetching: false,
          data: null,
          isError: true,
        }
      };

      const wrapper = shallow(
        <OrdersSummaryContainer {...props} />, {
          context: {
            i18n: {
              strings: languageStrings,
            },
          },
        }
      );
      expect(wrapper.containsMatchingElement(<div>Problem with fetching orders data</div>)).to.equal(true);
    });

    it('should render header and list of orders when data is correct', () => {
      const props = {
        orders: {
          isFetching: false,
          isError: false,
          data: [{
            "orderData": "01/01/2016",
            "deliveryCountry": "United Kingdom",
            "manufacturer": "Denzil Jeans",
            "gende": "M",
            "size": "32/32",
            "colour": "Light Blue",
            "style": "Skinny",
            "count": "7"
          }]
        }
      }
      const wrapper = shallow(
        <OrdersSummaryContainer {...props} />, {
          context: {
            i18n: {
              strings: languageStrings,
            },
          },
        }
      );

      expect(wrapper.containsMatchingElement(
        <table>
    	     <thead>
    	        <tr>
            		<th>OrderDate</th>
            		<th>DeliveryCountry</th>
            		<th>Manufacturer</th>
                <th>Gende</th>
                <th>Size</th>
                <th>Colour</th>
                <th>Style</th>
                <th>Count</th>
            	</tr>
    	      </thead>
    	       <tbody>
            	<tr>
            		<td>01/01/2016</td>
            		<td>United Kingdom</td>
            		<td>Denzil Jeans</td>
                <td>M</td>
                <td>32/32</td>
                <td>Light Blue</td>
                <td>Skinny</td>
                <td>7</td>
            	</tr>
    	     </tbody>
         </table>
      )).to.equal(true);
    });
  })
});
