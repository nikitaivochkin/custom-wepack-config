import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export default handleActions({
  [actions.createTodoSuccess](state, { payload: { todo } }) {
    const { byId, allIds, filtered } = state;
    const updatedById = { ...byId, [todo.id]: todo };
    const updatedAllIds = [...allIds, todo.id];
    return {
      byId: updatedById,
      allIds: updatedAllIds,
      filtered,
    };
  },
  [actions.finishTodo](state, { payload: { id } }) {
    const { byId, allIds, filtered } = state;
    const updatedById = { ...byId, [id]: { ...byId[id], completed: !byId[id].completed } };
    return { byId: updatedById, allIds, filtered };
  },
  [actions.fetchTodoSuccess](state, { payload: { todos } }) {
    const { byId, allIds, filtered } = state;
    const reducedById = todos.reduce((acc, t) => {
      acc[t.id] = t;
      return acc;
    }, {});
    return {
      byId: { ...byId, ...reducedById },
      allIds: [...allIds, ...Object.keys(reducedById)],
      filtered: [...filtered, ...Object.keys(reducedById)],
    };
  },
  [actions.filterTodo](state, { payload: { filter } }) {
    const { byId, allIds } = state;
    const filters = {
      all: (id) => id,
      active: (id) => !byId[id].completed,
      finished: (id) => byId[id].completed,
    };
    const filtered = allIds.filter(filters[filter]);
    return { byId, allIds, filtered };
  },
}, { byId: {}, allIds: [], filtered: [] });
