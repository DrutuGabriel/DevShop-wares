import styled from 'styled-components';

export const SignInContainer = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 800px){
    width: 100%;
    max-width: 410px;
    padding: 0 15px;
  }
`;

export const SingInTitle = styled.h2`
  margin: 10px 0;
`;

export const ButtonsBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media screen and (max-width: 800px){

    button{
      margin-bottom: 15px;
    }
  }
`;