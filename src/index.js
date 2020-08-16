import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './components/App';
import './styles/main.sass';
import store from './store';
import { fetchTodo } from './store/actions';

store.dispatch(fetchTodo({ limit: 6, page: 1 }));

const history = createBrowserHistory();
const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  root,
);
