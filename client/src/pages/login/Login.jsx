import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { loginThunk } from "../../store/authReducer"
import './login.scss'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const history = useHistory()

  const submitHandler = (e) => {
    e.preventDefault()

    try {
      dispatch(loginThunk(email, password))
    } catch (e) {
      setError(e)
      console.log(e.response.message)
    }

    history.push('/')
  }

  return (
    <div className="login">
      <div className="left">
        <div className="left__container">
          <h1>Lorem ipsum</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, cumque. amet consectetur adipisicing elit</p>
        </div>
      </div>
      <div className="right">
        <div className="right__container">
          <div className="row">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form className="col s12" onSubmit={submitHandler}>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="email"
                    type="email"
                    className="validate"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="password"
                    type="password"
                    className="validate"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <button className="waves-effect waves-light btn-large green accent-3" type="submit">Login</button>
              <Link to="/register" className="link">Register?</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
