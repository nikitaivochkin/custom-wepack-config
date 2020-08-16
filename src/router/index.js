import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import FetchTodo from '../components/FetchTodo';
import ErrorPage from '../components/ErrorPage';

export default [
  {
    path: '/todoList',
    component: TodoList,
  },
  {
    path: '/addTodo',
    component: AddTodo,
  },
  {
    path: '/fetchTodo',
    component: FetchTodo,
  },
  {
    path: '/',
    component: AddTodo,
  },
  {
    component: ErrorPage,
  },
];
