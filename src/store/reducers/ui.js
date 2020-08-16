import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export default handleActions({
  [actions.createTodoSuccess](state, { payload: { todo } }) {
    const { todoUIState } = state;
    const updatedById = { ...todoUIState, [todo.id]: { theme: 'active' } };
    return { todoUIState: updatedById };
  },
  [actions.fetchTodoSuccess](state, { payload: { todos } }) {
    const { todoUIState } = state;
    const reducedById = todos.reduce((acc, t) => {
      acc[t.id] = { theme: t.completed ? 'finished' : 'active' };
      return acc;
    }, {});
    return { todoUIState: { ...todoUIState, ...reducedById } };
  },
  [actions.finishTodo](state, { payload: { id } }) {
    const { todoUIState } = state;
    const newTheme = todoUIState[id].theme === 'active' ? 'finished' : 'active';
    return { todoUIState: { ...todoUIState, [id]: { theme: newTheme } } };
  },
}, { todoUIState: {} });
