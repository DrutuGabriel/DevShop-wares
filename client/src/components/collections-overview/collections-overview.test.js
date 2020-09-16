import React from 'react';
import {shallow} from 'enzyme';
import {CollectionsOverview} from './collections-overview.component';

describe('CollectionsOverview component', () => {
  let wrapper;

  beforeEach(() => {
    const mockProps = {
      collections: []
    }

    wrapper = shallow(<CollectionsOverview {...mockProps} />);
  });

  it('should render CollectionsOverview component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});