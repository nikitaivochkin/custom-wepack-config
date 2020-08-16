import React from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, Button, InputNumber,
} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Loader from '../_loader';
import * as actions from '../../store/actions';
import './fetchTodo.sass';

const mapStateToProps = (state) => {
  const { fetchOptions, todosStateReducer } = state;
  return { fetchOptions, todosStateReducer };
};

const actionCreators = {
  fetchTodo: actions.fetchTodo,
  updateFetchOptions: actions.updateFetchOptions,
};

const FetchTodo = (props) => {
  const { fetchOptions, todosStateReducer } = props;
  const { fetchTodo, updateFetchOptions } = props;

  const onChange = (type) => (value) => {
    const types = [
      {
        t: 'page',
        a: (v) => updateFetchOptions({ options: { ...fetchOptions, page: v } }),
      },
      {
        t: 'limit',
        a: (v) => updateFetchOptions({ options: { ...fetchOptions, limit: v } }),
      },
    ];
    types.find(({ t }) => t === type).a(value);
  };

  const { page, limit } = fetchOptions;

  return (
    <div className="fetch-todo">
      <Row>
        <Col span={12}>
          <p className="fetch-todo__label">page</p>
          <InputNumber min={1} max={10} defaultValue={page} onChange={onChange('page')} style={{ margin: '1vw' }} />
        </Col>
        <Col span={12}>
          <p className="fetch-todo__label">limit</p>
          <InputNumber min={1} max={30} defaultValue={limit} onChange={onChange('limit')} style={{ margin: '1vw' }} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {
            todosStateReducer !== 'requested'
            && (
            <Button
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              size="large"
              onClick={() => fetchTodo(fetchOptions)}
            >
              fetch todos
            </Button>
            )
          }
          {
            todosStateReducer === 'requested' && <Loader />
          }
        </Col>
      </Row>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(FetchTodo);
