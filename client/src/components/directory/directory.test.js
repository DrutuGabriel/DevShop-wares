import React from 'react';
import {shallow} from 'enzyme';
import {Directory} from './directory.component';


describe('Directory component', () => {
  let wrapper;
  let mockSections;

  beforeEach(() => {
    mockSections = [];

    const mockProps = {
      sections: mockSections
    }

    wrapper = shallow(<Directory {...mockProps} />);
  });


  it("should render Directory component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
