import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

const HeaderBlock = styled.header`
  width: 100%;
  padding: 1rem 2rem;
  justify-content: space-around;

  background-color: #222;
  color: #eee;
`;

const Header = () => {
  return (
    <HeaderBlock className="flex ai-center">
      <div className="flex jc-center ai-center">
        <Link href="/">
          <a>
            <Image src="/NETFLEX.svg" width={100} height={10} />
          </a>
        </Link>
        <Link href="/Movie">
          <a style={{ marginRight: '1rem' }}>Movie</a>
        </Link>
        <Link href="/TV">
          <a style={{ marginRight: '1rem' }}>TV</a>
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
