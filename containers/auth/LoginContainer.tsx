import { memo, useEffect, FormEvent, ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm, {
  NAME_PATTERN,
  PASSWORD_PATTERN,
} from '../../components/auth/AuthForm';
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
    const { name, value } = e.target;

    dispatch(changeField({ form: 'login', key: name, value }));

    switch (name) {
      case 'username':
        if (!value) {
          setError(error => error.concat('Check Username Is Empty.'));
        }

        if (!!value && !new RegExp(NAME_PATTERN).exec(value)) {
          setError(error => error.concat('Username must be Alphabet.'));
        }
        break;
      case 'password':
        if (!value) {
          setError(error => error.concat('Check Password Is Empty.'));
        }

        if (!!value && !new RegExp(PASSWORD_PATTERN).exec(value)) {
          setError(error =>
            error.concat(
              'Password Must Be At Least 8 ~ 16 Characters Long,',
              'Check All Passwords Must Contain',
              '1. Uppercase Letters,',
              '2. Lowercase Letters,',
              '3. Numbers,',
              '4. Special Characters',
            ),
          );
        }
        break;
      default:
        break;
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError([]);

    const { username, password } = form;

    if (!username) {
      setError(error => error.concat('Check Username Is Empty.'));
    }

    if (!password) {
      setError(error => error.concat('Check Password Is Empty.'));
    }

    if (!!username && !new RegExp(NAME_PATTERN).exec(username)) {
      setError(error => error.concat('Username must be Alphabet.'));
    }

    if (!!password && !new RegExp(PASSWORD_PATTERN).exec(password)) {
      setError(error =>
        error.concat(
          'Password Must Be At Least 8 ~ 16 Characters Long,',
          'Check All Passwords Must Contain',
          '1. Uppercase Letters,',
          '2. Lowercase Letters,',
          '3. Numbers,',
          '4. Special Characters',
        ),
      );
    }

    dispatch(login({ username, password }));
  };

  useEffect(() => {
    dispatch(initForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.error('AuthError:', authError);

      setError(error => error.concat('Login Failed'));

      return;
    }

    if (auth) {
      dispatch(check(auth));

      console.log('Successfully Logged in!');

      try {
        if (!!sessionStorage) {
          sessionStorage?.setItem('token', auth);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [auth, authError, dispatch]);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');

      try {
        if (!!sessionStorage) {
          sessionStorage?.setItem('user', user);
        }
      } catch (e) {
        console.error(e);
      }
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
