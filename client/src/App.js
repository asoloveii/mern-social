import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Home from './pages/home/Home'
import Header from './components/header/Header'
import Navbar from './components/navbar/Navbar'
import Rightbar from './components/rightbar/Rightbar'
import './app.scss'
import { useSelector } from 'react-redux'

function App() {
  const isAuth = useSelector(state => state.auth.isAuth)

  return (
    <BrowserRouter>
      {isAuth ? (
        <>
          <Header />
          <div className="home">
            <Navbar />
            <div className="main">
              <Switch>
                <Route exact path="/" component={Home} />
              </Switch>
            </div>
            <Rightbar />
          </div>
        </>
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
