import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export default handleActions({
  [actions.updateFetchOptions](state, { payload: { options } }) {
    return { ...state, ...options };
  },
}, { page: 1, limit: 6 });
