import React from 'react';
import styled from 'styled-components';

const FooterBlock = styled.footer`
  width: 100%;
  padding: 1rem 2rem;

  background-color: #000;
  color: #eee;

  & > a:hover {
    transition: all 0.2s ease-in-out;
    color: darkgray;
  }
`;

const Footer = () => {
  return (
    <FooterBlock>
      Copyright &copy; {new Date().getFullYear()} Made By{' '}
      <a href="https://github.com/SynCROSS">SynCROSS</a>
    </FooterBlock>
  );
};

export default Footer;
