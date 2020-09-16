import React from 'react';
import {shallow} from 'enzyme';
import CartItem from './cart-item.component';

describe('CartItem component', () => {
  let wrapper;
  
  beforeEach(() => {
    const mockProps = {
      item: {
        imageUrl: "",
        price: 50,
        name: "product",
        quantity: 1
      }
    };

    wrapper = shallow(<CartItem {...mockProps} />);
  });

  it('should render the CartItem component', () => {
    expect(wrapper).toMatchSnapshot();
  });

});