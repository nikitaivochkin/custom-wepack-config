import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { uniqueId } from 'lodash';
import { Row, Radio } from 'antd';
import * as actions from '../../store/actions';
import Todo from '../_todo';
import Loader from '../_loader';
import './todolist.sass';

const mapStateToProps = (state) => {
  const { todos: { byId, allIds, filtered }, todosFetchState } = state;
  return {
    byId, allIds, filtered, todosFetchState,
  };
};

const actionCreators = {
  filterTodo: actions.filterTodo,
  fetchTodo: actions.fetchTodo,
};

const TodoList = (props) => {
  const {
    byId, filtered, location, todosFetchState,
  } = props;
  const { filterTodo } = props;

  const activeLink = location.search.substr(1) ? location.search.substr(1) : 'all';
  const [link, setLink] = useState(activeLink);

  useEffect(() => {
    if (todosFetchState === 'succes') {
      filterTodo({ filter: activeLink });
    }
  }, [todosFetchState, activeLink, filterTodo]);

  const handleChangeLink = ({ target: { value } }) => setLink(value);

  const handleFilterTodos = ({ target }) => {
    const { value } = target.closest('label').querySelector('input');
    filterTodo({ filter: value });
  };

  return (
    <div className="todo-list">
      <Row gutter={16}>
        <div className="todo-list__nav">
          <Radio.Group value={link} onChange={handleChangeLink}>
            <Link to="/todoList?all" onClick={handleFilterTodos}>
              <Radio.Button value="all" style={{ minWidth: 100 }}>
                All
              </Radio.Button>
            </Link>
            <Link to="/todoList?active" onClick={handleFilterTodos}>
              <Radio.Button value="active" style={{ minWidth: 100 }}>
                Active
              </Radio.Button>
            </Link>
            <Link to="/todoList?finished" onClick={handleFilterTodos}>
              <Radio.Button value="finished" style={{ minWidth: 100 }}>
                Finished
              </Radio.Button>
            </Link>
          </Radio.Group>
        </div>
      </Row>
      <Row gutter={16}>
        {
          filtered.length !== 0 && todosFetchState === 'succes' && filtered.map((id) => {
            const { title, completed } = byId[id];
            return (
              <Todo
                key={uniqueId()}
                id={id}
                title={title}
                completed={completed}
                activeLink={activeLink}
              />
            );
          })
        }
        {
          todosFetchState === 'requested' && <Loader />
        }
        {
          filtered.length === 0 && todosFetchState !== 'requested' && (
            <div className="empty-todos">
              No todos
            </div>
          )
        }
      </Row>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(TodoList);
