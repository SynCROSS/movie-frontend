import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

const HeaderBlock = styled.header`
  width: 100%;
  padding: 1rem 5rem;
  justify-content: space-between;
  position: sticky;
  top: 0;
  left: 0;
  /* z-index: 10; */

  background-color: #000;
  color: #eee;
`;

const MenuLink = styled.a`
  margin: 0 1rem;

  &:hover {
    color: #ddd;
  }
`;

const Header = () => {
  return (
    <HeaderBlock className="flex ai-center">
      <div className="flex jc-center">
        <Link href="/">
          <a>
            <Image src="/NETFLEX.svg" width={140} height={20} />
          </a>
        </Link>
        <Link href="/Movie">
          <MenuLink>Movie</MenuLink>
        </Link>
        <Link href="/TV">
          <MenuLink>TV</MenuLink>
        </Link>
      </div>
      <div className="flex jc-center ai-center">
        {
          // * Login and Sign Up
          // * &
          // * User
        }
      </div>
    </HeaderBlock>
  );
};

export default Header;
