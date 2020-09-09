import React from 'react';
import {shallow} from 'enzyme';
import HomePage from './homepage.component';


it('should render the HomePage component', () => {
  expect(shallow(<HomePage />)).toMatchSnapshot();
});