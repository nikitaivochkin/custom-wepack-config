import { createAction } from 'redux-actions';
import { getRequest, postRequest } from '../../utils/apiHelper';

export const addAllTodos = createAction('ADD_ALL_TODOS');

export const filterTodo = createAction('FILTER_TODO');

export const finishTodo = createAction('FINISH_TODO');

export const removeTodo = createAction('REMOVE_TODO');

export const completeTodo = createAction('COMPLETE_TODO');

export const updateFetchOptions = createAction('UPDATE_FETCH_OPTIONS');

export const fetchTodoRequest = createAction('FETCH_TODO_REQUEST');
export const fetchTodoSuccess = createAction('FETCH_TODO_SUCCESS');
export const fetchTodoFailure = createAction('FETCH_TODO_FAILURE');

export const fetchTodo = (params) => async (dispatch) => {
  dispatch(fetchTodoRequest());
  try {
    dispatch(fetchTodoSuccess({ todos: await getRequest(params) }));
  } catch (e) {
    dispatch(fetchTodoFailure());
  }
};

export const createTodoRequest = createAction('CREATE_TODO_REQUEST');
export const createTodoSuccess = createAction('CREATE_TODO_SUCCESS');
export const createTodoFailure = createAction('CREATE_TODO_FAILURE');

export const createTodo = (todo) => async (dispatch) => {
  dispatch(createTodoRequest());
  try {
    dispatch(createTodoSuccess({ todo: await postRequest(JSON.stringify(todo)) }));
  } catch (e) {
    dispatch(fetchTodoFailure());
  }
};
