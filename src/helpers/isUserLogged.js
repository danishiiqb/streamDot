import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGlobal } from '../context/GlobalContext';

function IsUserLogged({ children, ...rest }) {
  const { user } = useAuth();
  const { routingNormal } = useGlobal();

  return (
    <Route
      {...rest}
      render={() => {
        if (!user || routingNormal) {
          return children;
        } else {
          return <Redirect to='/watchDash' />;
        }
      }}
    ></Route>
  );
}

export default IsUserLogged;
