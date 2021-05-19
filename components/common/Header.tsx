import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { AuthButton } from '../auth/AuthForm';

const HeaderBlock = styled.header`
  width: 100%;
  padding: 1rem 5rem;
  justify-content: space-between;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;

  background-color: #000;
  color: #eee;
`;

const MenuLink = styled.a`
  margin: 0 1rem;

  &:hover {
    color: #ddd;
  }
`;

const StyledAuthButton = styled(AuthButton)`
  margin: 0 0.5rem;
  width: 7rem;
  height: 3rem;

  &.register {
    background: none;
    border: 1px solid #eee;

    &:hover {
      border: 1px solid #ff1746;
      color: #ff1746;
    }
  }
`;

const Header = ({ user }) => {
  return (
    <HeaderBlock className="flex ai-center">
      <div className="flex jc-center ai-center">
        <Link href="/">
          <a className="flex jc-center ai-center">
            <Image src="/logo.svg" width={140} height={20} alt="NETFLEX" />
          </a>
        </Link>
        <MenuLink href="/Movie">Movie</MenuLink>
        <MenuLink href="/TV">TV</MenuLink>
      </div>
      {
        // * Login and Sign Up
        // * &
        // * User
        user ? (
          <div className="flex jc-center ai-center">
            <strong>{user?.username}</strong>
            <StyledAuthButton>Log out</StyledAuthButton>
          </div>
        ) : (
          <div className="flex jc-center ai-center">
            <a href="/Login">
              <StyledAuthButton className="login">Log in</StyledAuthButton>
            </a>
            <a href="/Register">
              <StyledAuthButton className="register">Sign Up</StyledAuthButton>
            </a>
          </div>
        )
      }
    </HeaderBlock>
  );
};

export default Header;
