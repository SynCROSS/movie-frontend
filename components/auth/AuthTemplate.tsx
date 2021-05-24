import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

const AuthTemplateBlock = styled.div`
  background-color: #080808;
  width: 100%;
`;

const BlackBox = styled.div`
  width: 30rem;
  padding: 3rem 5rem;
  background-color: #000;
`;

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock className="main-content flex jc-center ai-center">
      <BlackBox className="flex jc-center ai-center flex-dir-col">
        <Link href="/">
          <a>
            <Image src="/logo.svg" width={100} height={50} />
          </a>
        </Link>
        {children}
      </BlackBox>
    </AuthTemplateBlock>
  );
};

export default AuthTemplate;
