import React from 'react';
import {shallow} from 'enzyme';
import {Header} from './header.component';

import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import {
  OptionLink 
} from './header.styles';

describe('Header component', () => {
  let wrapper;
  let mockSignOutStart;

  beforeEach(() => {
    mockSignOutStart = jest.fn();

    const mockProps = {
      signOutStart: mockSignOutStart,
      currentUser: {
        uid: '123'
      },
      hidden: true
    };

    wrapper = shallow(<Header {...mockProps} />);
  });

  it('should render Header component', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  describe('if currentUser is present', () => {
    it('should render sign out link', () => {
      expect(wrapper.find(OptionLink).at(2).text()).toBe('SIGN OUT');
    });

    it('should call signOutStart method when link is called', () => {
      wrapper.find(OptionLink).at(2).simulate('click');

      expect(mockSignOutStart).toHaveBeenCalled();
    });
  });

  describe('if hidden is true', () => {
    it('should not render CartDropdown', () => {
      expect(wrapper.exists(CartDropdown)).toBe(false);
    });
  });

  describe('if currentUser is null and hidden false', () => {
    let newWrapper;

    const newMockProps = {
      hidden: false,
      currentUser: null,
      signOutStart: mockSignOutStart
    };

    beforeEach(() => {
      newWrapper = shallow(<Header {...newMockProps} />);
    });
  
    
    it('should render sign in link', () => {
      expect(newWrapper.find(OptionLink).at(2).text()).toBe('SIGN IN');
    });

    it('should render CartDropdown', () => {
      expect(newWrapper.exists(CartDropdown)).toBe(true);
    });

  });


});