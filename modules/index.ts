import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import { all } from 'redux-saga/effects';
import { authSaga } from './auth';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
