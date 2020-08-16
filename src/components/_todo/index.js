import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { Card, Checkbox, Col } from 'antd';
import * as actions from '../../store/actions';
import './todo.sass';

const mapStateToProps = (state) => {
  const { ui: { todoUIState } } = state;
  return { todoUIState };
};

const actionCreators = {
  finishTodo: actions.finishTodo,
  filterTodo: actions.filterTodo,
};

const Todo = ({
  id, title, completed, finishTodo, filterTodo, todoUIState, activeLink,
}) => {
  const handleFinishTodo = (todoId) => () => {
    finishTodo({ id: todoId });
    setTimeout(() => filterTodo({ filter: activeLink }), 100);

    const lStore = JSON.parse(localStorage.getItem('todosStore'));
    const updaedLStore = lStore.reduce((acc, t) => (Number(t.id) === Number(todoId)
      ? [...acc, { ...t, completed: !t.completed }] : [...acc, t]), []);
    localStorage.setItem('todosStore', JSON.stringify(updaedLStore));
  };
  const todoClassNames = cn({
    todo: true,
    [todoUIState[id].theme]: true,
  });
  return (
    <div className={todoClassNames}>
      <Col span={8}>
        <Card title={id} bordered={false} style={{ width: 300 }}>
          <p className="todo__content">{title}</p>
          <Checkbox
            type="checkbox"
            className="todo__complited"
            checked={completed}
            onChange={handleFinishTodo(id)}
          >
            Finish todo
          </Checkbox>
        </Card>
      </Col>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Todo);
