import '../styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, { rootSaga } from '../modules/index';
import createSagaMiddleware from 'redux-saga';
import { tempSetUser, check } from '../modules/user';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

const loadUser = () => {
  try {
    if (typeof sessionStorage === 'undefined') {
      return;
    }

    const user = sessionStorage?.getItem('user');
    const token = sessionStorage?.getItem('token');

    if (!user || !token) {
      return;
    }

    store.dispatch(tempSetUser(user));
    store.dispatch(check(token));
  } catch (e) {
    console.error(e);
  }
};

loadUser();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
