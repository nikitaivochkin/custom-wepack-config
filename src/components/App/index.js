import React, { useState, useEffect } from 'react';
import { uniqueId } from 'lodash';
import {
  Switch,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import routes from '../../router';
import PathContext from '../../context/pathContext';
import './app.sass';

const App = ({ history: { location } }) => {
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const { pathname } = location;

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <PathContext.Provider value={currentPath}>
      <Header />
      <div className="content">
        <Switch>
          {
            routes.map(({ path, component }) => (path === '/' ? (
              <Route
                exact
                key={uniqueId()}
                path="/"
                render={() => (<Redirect to="/todoList" />)}
              />
            ) : (
              <Route
                exact
                key={uniqueId()}
                path={path}
                component={component}
              />
            )))
          }
        </Switch>
      </div>
      <Footer />
    </PathContext.Provider>
  );
};

export default withRouter(App);
