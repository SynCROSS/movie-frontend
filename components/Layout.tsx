import Header from './common/Header';
import Footer from './common/Footer';

const Layout = ({ children }) => {
  return (
    <div
      className="flex jc-center ai-center flex-dir-col"
      // style={{ height: '100%' }}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
