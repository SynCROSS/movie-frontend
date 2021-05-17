import { memo, useEffect, FormEvent, ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initForm, login } from '../../modules/auth';
import { RootState } from '../../modules/index';
import { check } from '../../modules/user';
import { useRouter } from 'next/dist/client/router';

const LoginContainer = () => {
  const [error, setError] = useState([]);

  const { form, auth, authError, user } = useSelector((state: RootState) => ({
    form: state.auth.login,
    auth: state.auth.auth,
    authError: state.auth.authError,
    user: state.user.user,
  }));

  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(changeField({ form: 'login', key: name, value }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { username, password } = form;

    if ([username, password].includes('')) {
      setError(error => error.concat('Check Username or Password Is Empty.'));
    }

    dispatch(login({ username, password }));
  };

  useEffect(() => {
    dispatch(initForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('AuthError:', authError);
      setError(error => error.concat('Login Failed'));
      return;
    }
    if (auth) {
      console.log('Successfully Logged in!');
      const token = document?.cookie
        ?.split('; ')
        ?.find(row => row.startsWith('Authentication='))
        ?.split('=')[1];

      dispatch(check({ token }));
    }
  }, [auth, authError, dispatch]);

  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [router, user]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={new Set(error)}
    />
  );
};

export default memo(LoginContainer);