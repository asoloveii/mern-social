import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { useSelector } from "react-redux"
import Login from './pages/login/Login'
import Register from './pages/register/Register'

function App() {
  const isAuth = useSelector(state => state.auth.isAuth)

  return (
    <BrowserRouter>
      {isAuth ? (
        <Switch>

        </Switch>
      ) : (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Redirect to="/login" />
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default App;
