import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

// /* eslint-disable no-underscore-dangle */
// const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
// const devtoolMiddleware = ext && ext();
// /* eslint-enable */

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    // process.env.NODE_ENV === 'development' ? devtoolMiddleware : null,
  ),
);

export default store;
