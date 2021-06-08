import { useState } from 'react';
import styled from 'styled-components';

const AuthFormBlock = styled.div``;

export const AuthButton = styled.button`
  width: 100%;
  min-width: 64px;
  height: 42px;
  padding: 0 8px;
  border: 1px solid #ff1746;
  border-radius: 5px;
  color: #eee;
  font-weight: bold;
  background-color: #ff1746;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: none;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid gray;
  margin-bottom: 0.8rem;
  padding-bottom: 0.2rem;
  background: none;
  color: #ccc;

  &:focus {
    transition: all 0.2s ease-in-out;
    color: #eee;
    border-bottom: 1px solid lightgray;
  }

  /* &:invalid {
    border-bottom: 1px solid #ff1746;
  } */
`;

const AuthLinkArea = styled.div`
  color: #ddd;
  margin: 1rem auto;

  a {
    color: #ff1746;

    &:hover {
      color: #ff0000;
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.ul`
  color: #ff1746;
  font-size: 0.8rem;

  & > li {
    margin-bottom: 1rem;
  }
  /* padding: 0.5rem 0; */
`;

const typeList = {
  login: 'Log in',
  register: 'Sign up',
};

export const PASSWORD_PATTERN =
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[\\w\\d@$!%*?&]{8,16}$';
export const EMAIL_PATTERN =
  '^[\\d\\w]([-_\\.]?[\\d\\w])*@[\\d\\w]([-_\\.]?[\\d\\w])*\\.[\\d\\w]{2,3}$';

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  return (
    <AuthFormBlock>
      <form onSubmit={onSubmit}>
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="Username"
          onChange={onChange}
          value={form?.username}
          // required
        />
        {type === 'register' && (
          <StyledInput
            autoComplete="nickname"
            name="nickname"
            placeholder="Nickname"
            onChange={onChange}
            value={form?.nickname}
            // required
          />
        )}
        {type === 'register' && (
          <StyledInput
            autoComplete="email"
            type="email"
            name="email"
            placeholder="Email [option]"
            onChange={onChange}
            value={form?.email}
            pattern={EMAIL_PATTERN}
          />
        )}
        <StyledInput
          autoComplete="password"
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
          value={form?.password}
          pattern={PASSWORD_PATTERN}
          // required
        />
        {type === 'register' && (
          <StyledInput
            autoComplete="passwordConfirm"
            type="password"
            name="passwordConfirm"
            placeholder="Confirm Password"
            onChange={onChange}
            value={form?.passwordConfirm}
            pattern={PASSWORD_PATTERN}
            // required
          />
        )}
        {error && (
          <ErrorMessage>
            {[...error].map(err => (
              <li key={err}>{err}</li>
            ))}
          </ErrorMessage>
        )}
        <AuthButton>{type && typeList[type]}</AuthButton>
        {type === 'login' ? (
          <AuthLinkArea>
            No Account? <a href="/Register">Create One</a>
          </AuthLinkArea>
        ) : type === 'register' ? (
          <AuthLinkArea>
            Already Have an Account? <a href="/Login">Log in</a>
          </AuthLinkArea>
        ) : null}
      </form>
    </AuthFormBlock>
  );
};

export default AuthForm;
