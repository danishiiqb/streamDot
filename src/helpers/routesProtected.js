import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RoutesProtected({ component: Component, ...rest }) {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return <Component key={props.match.params.id} {...props} />;
        } else {
          return <Redirect to={'/signup'} />;
        }
      }}
    ></Route>
  );
}

export default RoutesProtected;
