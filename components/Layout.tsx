import Footer from './common/Footer';
import HeaderContainer from '../containers/common/HeaderContainer';

const Layout = ({ children }) => {
  return (
    <div
      className="flex jc-center ai-center flex-dir-col"
      style={{ minHeight: '100%' }}
    >
      <HeaderContainer />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
