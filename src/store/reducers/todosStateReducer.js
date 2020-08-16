import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const todosFetchState = handleActions({
  [actions.fetchTodoRequest]() {
    return 'requested';
  },
  [actions.fetchTodoFailure]() {
    return 'failed';
  },
  [actions.fetchTodoSuccess]() {
    return 'succes';
  },
}, 'none');

export const todosCreateState = handleActions({
  [actions.createTodoRequest]() {
    return 'requested';
  },
  [actions.createTodoFailure]() {
    return 'failed';
  },
  [actions.createTodoSuccess]() {
    return 'succes';
  },
}, 'none');
