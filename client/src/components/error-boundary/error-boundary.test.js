import React from 'react';
import {shallow} from 'enzyme';
import ErrorBoundary from './error-boundary.component';

import {
  ErrorImageOverlay
} from './error-boundary.styles';


describe("ErrorBoundary component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ErrorBoundary><div id="child"></div></ErrorBoundary>);
  });

  it('should show the children', () => {
  expect(wrapper.find("div#child").length).toBe(1);
  expect(wrapper.find(ErrorImageOverlay).length).toBe(0);
  });


  it('should show error if hasErrored', () => {
    wrapper.setState({hasErrored: true});

    expect(wrapper.find("div#child").length).toBe(0);
    expect(wrapper.find(ErrorImageOverlay).length).toBe(1);
  });
});