import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

const HeaderBlock = styled.header`
  width: 100%;
  padding: 1rem 5rem;
  justify-content: space-between;

  background-color: #222;
  color: #eee;
`;

const Header = () => {
  return (
    <HeaderBlock className="flex ai-center">
      <div className="flex jc-center">
        <Link href="/">
          <a>
            <Image src="/NETFLEX.svg" width={200} height={20} />
          </a>
        </Link>
        {/* <Link href="/Movie">
          <a style={{ marginRight: '1rem' }}>Movie</a>
        </Link>
        <Link href="/TV">
          <a style={{ marginRight: '1rem' }}>TV</a>
        </Link> */}
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
