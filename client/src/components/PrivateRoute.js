import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = props => {
  return (
    <Route {...props}>
      {localStorage.getItem('token') ? props.children : <Redirect to="/" />}
    </Route>
  );
};

export default PrivateRoute;