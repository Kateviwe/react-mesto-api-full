//HOC-компонент для защиты переданного ему на вход компонента от посещения неавторизованным пользователем
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {

  return (
    <Route>
        {() => props.loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />}
    </Route>
  )
}

export default ProtectedRoute;