import React from 'react';
import {shallow} from 'enzyme';
import SignInAndSignUpPage from './sign-in-and-sign-out.component';

describe('SignInAndSignUpPage', () => {
  it('should render the SignInAndSignUp component', () => {
    expect(shallow(<SignInAndSignUpPage />)).toMatchSnapshot();
  });
})