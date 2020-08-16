import React, { useContext } from 'react';
// import { uniqueId } from 'lodash';
import { Link } from 'react-router-dom';
import PathContext from '../../context/pathContext';
import './navigation.sass';

const links = [
  {
    name: 'todoList',
    path: '/todoList',
  },
  {
    name: 'addTodo',
    path: '/addTodo',
  },
  {
    name: 'fetchTodo',
    path: '/fetchTodo',
  },
];

const Navigation = () => {
  const currentPath = useContext(PathContext);

  return (
    <div className="navigation">
      {
        links.map(({ name, path }) => (
          <div
            className={`navigation__element ${currentPath === path ? 'navigation__element_active' : null}`}
            key={name + path}
          >
            <Link to={path}>{name}</Link>
          </div>
        ))
      }
    </div>
  );
};

export default Navigation;
