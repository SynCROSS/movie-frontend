import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from '@redux-saga/core/effects';

const CHANGE_FIELD = 'auth/CHANGE_FIELD' as const;
const INIT_FORM = 'auth/INIT_FORM' as const;

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes('auth/REGISTER');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN');

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  }),
);
export const initForm = createAction(INIT_FORM, form => form);
export const register = createAction(
  REGISTER,
  ({ username, nickname, email, password }) => ({
    username,
    nickname,
    email,
    password,
  }),
);
export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));

const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  login: {
    username: '',
    password: '',
  },
  register: {
    username: '',
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
    [INIT_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;
