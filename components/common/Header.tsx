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

  background: rgba(0, 0, 0, 0.7);
  color: #eee;

  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`;

const HeaderMenu = styled.div`
  @media only screen and (max-width: 600px) {
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    width: 0;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0;
    overflow-x: hidden;
    background-color: #111;
    transition: all 0.5s ease-in-out;
  }
`;

const MenuLink = styled.a`
  margin: 0 1rem;

  &:hover {
    color: #ddd;
  }
`;

const StyledAuthButton = styled(AuthButton)`
  margin: 0 0.5rem;
  width: 6rem;
  height: 2.5rem;

  &.register {
    background: none;
    border: 1px solid #eee;

    &:hover {
      border: 1px solid #ff1746;
      color: #ff1746;
    }
  }
`;

const MenuButton = styled.button`
  font-size: 2rem;
  color: #aaa;
  background: transparent;
  line-height: 1;
  display: none;
  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    display: block;
    margin: 15px 20px;
  }
`;

const CloseButton = styled.button`
  display: none;
  background: transparent;
  color: #e0e0e0;
  position: absolute;
  top: 2rem;

  @media only screen and (max-width: 600px) {
    display: block;
  }
`;

const Header = ({ user }) => {
  const openMenu = () => {
    if (document) {
      document.getElementById('header_menu').style.width = '100px';
      document.getElementById('header_block').style.width = '100%';
    }
  };

  const closeMenu = () => {
    if (document) {
      document.getElementById('header_menu').removeAttribute('style');
      document.getElementById('header_block').removeAttribute('style');
    }
  };

  return (
    <HeaderBlock className="flex ai-center" id="header_block">
      <MenuButton aria-labelledby="Menu" onClick={openMenu}>
        ☰
      </MenuButton>
      <HeaderMenu className="flex jc-center ai-center" id="header_menu">
        <CloseButton aria-labelledby="Close" onClick={closeMenu}>
          ×
        </CloseButton>
        <Link href="/">
          <a className="flex jc-center ai-center" onClick={closeMenu}>
            <Image src="/logo.svg" width={140} height={20} alt="NETFLEX" />
          </a>
        </Link>
        <MenuLink href="/Movie" onClick={closeMenu}>
          Movie
        </MenuLink>
        <MenuLink href="/TV" onClick={closeMenu}>
          TV
        </MenuLink>
      </HeaderMenu>
      {user ? (
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
      )}
    </HeaderBlock>
  );
};

export default Header;
