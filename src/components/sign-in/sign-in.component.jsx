import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, signInWithGoogle} from '../../firebase/firebase.utils';

import {
  SignInContainer,
  SingInTitle,
  ButtonsBarContainer
} from './sign-in.styles';

class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      
      this.setState({
        email: '',
        password: ''
      });

    } catch (error){
      console.log(error);
    }

  }

  handleChange = event => {
    const {value, name} = event.target;

    this.setState({
      [name] : value
    });
  }

  render() { 
    return (
      <SignInContainer>
          <SingInTitle>I already have an account</SingInTitle>
          <span>Sign in with your email and password</span>

          <form onSubmit={this.handleSubmit}>
            <FormInput 
              label='Email'
              name='email' 
              type='email' 
              value={this.state.email}
              handleChange={this.handleChange}
              required 
            />
            <FormInput 
              label='Password'
              name='password' 
              type='password' 
              value={this.state.password}
              handleChange={this.handleChange}
              required 
            />
            <ButtonsBarContainer>
              <CustomButton type='submit'>
                Sign in
              </CustomButton>
              <CustomButton isGoogleSignIn onClick={signInWithGoogle}>
                Sign in with Google
              </CustomButton>
            </ButtonsBarContainer>
          </form>
      </SignInContainer>  
    );
  }
}
 
export default SignIn;