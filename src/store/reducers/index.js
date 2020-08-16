import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import todos from './todosReducer';
import ui from './ui';
import { todosFetchState, todosCreateState } from './todosStateReducer';
import fetchOptions from './fetchOptionsReducer';

export default combineReducers({
  todos,
  ui,
  todosFetchState,
  todosCreateState,
  fetchOptions,
  form: formReducer,
});
