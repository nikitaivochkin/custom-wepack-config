/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Input, Button } from 'antd';
import Loader from '../_loader';
import * as actions from '../../store/actions';
import './addtodo.sass';

const mapSpateToProps = (state) => {
  const { todos: { allIds }, todosCreateState } = state;
  return { allIds, todosCreateState };
};

const actionCreators = {
  createTodo: actions.createTodo,
};

const renderField = ({
  input, label, type, meta: { touched, error },
}) => {
  const { name } = input;
  return (
    <div className="form__element">
      <Input {...input} id={name} placeholder={label} type={type} />
      {touched && error && <span className="error">{error}</span>}
    </div>
  );
};

const AddTodo = (props) => {
  const handleCreateTodo = (values) => {
    const { allIds } = props;
    const { createTodo, reset } = props;
    const id = allIds.length !== 0 ? Number(allIds[allIds.length - 1]) + 1 : 1;
    if (!values.name) {
      throw new SubmissionError({
        name: 'tap todo name',
        _error: 'error',
      });
    } else if (!values.title) {
      throw new SubmissionError({
        title: 'tap todo title',
        _error: 'error',
      });
    } else {
      const newTodo = { ...values, id: String(id), completed: false };
      createTodo(newTodo);

      reset();
    }
  };

  const {
    handleSubmit, error, pristine, reset, submitting, todosCreateState,
  } = props;
  return (
    <div className="add-todo">
      <form className="form" onSubmit={handleSubmit(handleCreateTodo)}>
        <Field
          name="name"
          type="text"
          component={renderField}
          label="todo name"
        />
        <Field
          name="title"
          type="text"
          component={renderField}
          label="todo content"
        />
        <div className="form__submit">
          {error && <strong className="form__error">{error}</strong>}
          {
            todosCreateState !== 'requested'
            && <Button type="primary" htmlType="submit" disabled={submitting}>Create new Todo</Button>
          }
          {
            todosCreateState === 'requested'
            && <Loader />
          }
          <Button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Reset values
          </Button>
        </div>
      </form>
    </div>
  );
};

const connectedAddTodo = connect(mapSpateToProps, actionCreators)(AddTodo);

export default reduxForm({
  form: 'addTodoForm',
})(connectedAddTodo);
