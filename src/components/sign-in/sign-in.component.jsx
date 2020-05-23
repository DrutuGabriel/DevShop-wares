import React from 'react';
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

    const {emailSignInStart} = this.props;
    const {email, password} = this.state;

    emailSignInStart(email, password);
  }

  handleChange = event => {
    const {value, name} = event.target;

    this.setState({
      [name] : value
    });
  }

  render() { 
    const {googleSignInStart} = this.props;
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
              <CustomButton 
                type='submit' 
                onClick={this.handleSubmit}
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
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(
    emailSignInStart({email, password})
  )
});
 
export default connect(null, mapDispatchToProps)(SignIn);