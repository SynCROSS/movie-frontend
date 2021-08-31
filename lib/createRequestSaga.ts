import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export const createRequestActionTypes = (type: string) => {
  const SUCCESS = `${type}_SUCCESS` as const;
  const FAILURE = `${type}_FAILURE` as const;
  
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type: string, request) {
  const SUCCESS = `${type}_SUCCESS` as const;
  const FAILURE = `${type}_FAILURE` as const;

  return function* (action) {
    yield put(startLoading(type));

    try {
      const response: string | object = yield call(request, action?.payload);
      yield put({
        type: SUCCESS,
        payload: response,
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
      console.error(e);
    }
    yield put(finishLoading(finishLoading(type)));
  };
}
