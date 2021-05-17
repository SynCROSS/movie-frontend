import { memo, useEffect, ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initForm, register } from '../../modules/auth';
import { check } from '../../modules/user';
import {
  PASSWORD_PATTERN,
  EMAIL_PATTERN,
} from '../../components/auth/AuthForm';
import { useRouter } from 'next/dist/client/router';
import { RootState } from '../../modules/index';

const RegisterContainer = () => {
  const [error, setError] = useState([]);

  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector((state: RootState) => ({
    form: state.auth.register,
    auth: state.auth.auth,
    authError: state.auth.authError,
    user: state.user.user,
  }));

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(changeField({ form: 'register', key: name, value }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { username, nickname, email, password, passwordConfirm } = form;
    console.log(authError);

    if ([username, nickname, password, passwordConfirm].includes('')) {
      setError(error =>
        error.concat(
          'Check Username, Nickname, Password, Confirm Password Are Empty.',
        ),
      );
    }

    if (email && !new RegExp(EMAIL_PATTERN).exec(email)) {
      setError(error => error.concat('Check Email is Empty.'));
    }

    if (
      !new RegExp(PASSWORD_PATTERN).exec(password) ||
      !new RegExp(PASSWORD_PATTERN).exec(passwordConfirm)
    ) {
      setError(error =>
        error.concat(
          'Check All Passwords Contain Minimum 8 And Maximum 16 Characters, At Least 1 Uppercase Letter, 1 Lowercase Letter, 1 Number And 1 Special Character',
        ),
      );
    }

    if (password !== passwordConfirm) {
      setError(error =>
        error.concat('Check Password And Confirm Password Are Same.'),
      );
    }

    if (!error) {
      form.passwordConfirm = undefined;
      dispatch(register(form));
    }
  };

  useEffect(() => {
    dispatch(initForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('AuthError:', authError);
      if (authError.response.status === 409) {
        setError(error => error.concat('This Account Already Exists.'));
      }
      return;
    }
    if (auth) {
      const { id, createdAt, updatedAt, deletedAt, ...userData } = auth;
      console.log('Successfully Registered', userData);
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
      console.log('User:', user);
      router.push('/Login');
    }
  }, [router, user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={new Set(error)}
    />
  );
};

export default memo(RegisterContainer);