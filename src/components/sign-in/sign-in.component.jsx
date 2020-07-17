import React, {useState} from 'react';
import {connect} from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {
  googleSignInStart,
  emailSignInStart
} from '../../redux/user/user.actions';

import {
  SignInContainer,
  SingInTitle,
  ButtonsBarContainer
} from './sign-in.styles';

const SignIn = ({emailSignInStart, googleSignInStart}) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const {email, password} = userCredentials;
  
  const handleSubmit = async event => {
    event.preventDefault();

    emailSignInStart(email, password);
  }

  const handleChange = event => {
    const {value, name} = event.target;

    setCredentials({...userCredentials, [name] : value})
  }


    return (
      <SignInContainer>
          <SingInTitle>I already have an account</SingInTitle>
          <span>Sign in with your email and password</span>

          <form onSubmit={handleSubmit}>
            <FormInput 
              label='Email'
              name='email' 
              type='email' 
              value={email}
              handleChange={handleChange}
              required 
            />
            <FormInput 
              label='Password'
              name='password' 
              type='password' 
              value={password}
              handleChange={handleChange}
              required 
            />
            <ButtonsBarContainer>
              <CustomButton 
                type='submit' 
                onClick={handleSubmit}
              >
                Sign in
              </CustomButton>
              <CustomButton 
                type='button'
                isGoogleSignIn 
                onClick={googleSignInStart}
              >
                Sign in with Google
              </CustomButton>
            </ButtonsBarContainer>
          </form>
      </SignInContainer>  
    );

}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(
    emailSignInStart({email, password})
  )
});
 
export default connect(null, mapDispatchToProps)(SignIn);