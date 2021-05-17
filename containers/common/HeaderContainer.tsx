import Header from '../../components/common/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules/index';

const HeaderContainer = () => {
  const { user } = useSelector((state: RootState) => ({
    user: state.user.user,
  }));
  return <Header user={user} />;
};

export default HeaderContainer;
