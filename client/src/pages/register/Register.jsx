import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerAPI } from '../../api/api'
import './register.scss'

export default function Register({ history }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confpassword, setConfpassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [desc, setDesc] = useState("")
  const [age, setAge] = useState("")
  const [profilePic, setProfilePic] = useState(null)

  const [error, setError] = useState("")

  const submitHandler = async (e) => {
    e.preventDefault()

    if (confpassword === password) {
      const formdata = new FormData()

      formdata.append("email", email)
      formdata.append("password", password)
      formdata.append("firstname", firstname)
      formdata.append("lastname", lastname)
      formdata.append("desc", desc)
      formdata.append("age", age)
      formdata.append("profilePic", profilePic)

      try {
        await registerAPI(formdata)
      } catch (e) {
        setError(e)
        console.log(e.response.message)
      }

      !error && history.push('/login')
    } else {
      setError("Password doen't correct")
    }
  }

  return (
    <div className="register">
      <div className="left">
        <div className="left__container">
          <h1>Lorem ipsum</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, cumque. amet consectetur adipisicing elit</p>
        </div>
      </div>
      <div className="right">
        <div className="right__container">
          <div className="row">
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <form className="col s12" onSubmit={submitHandler}>
              <div className="row">
                <label htmlFor="profilePic">
                  <img src="/images/profileDefault.png" alt="Profile" className="profilePic" />
                </label>
                <input
                  id="profilePic"
                  style={{ display: "none" }}
                  name="profilePic"
                  type="file"
                  className="validate"
                  onChange={e => setProfilePic(e.target.files[0])}
                />
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    id="firstname"
                    type="text"
                    className="validate"
                    value={firstname}
                    onChange={e => setFirstname(e.target.value)}
                  />
                  <label htmlFor="email">First name</label>
                </div>
                <div className="input-field col s6">
                  <input
                    id="lastname"
                    type="text"
                    className="validate"
                    value={lastname}
                    onChange={e => setLastname(e.target.value)}
                  />
                  <label htmlFor="email">Last name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s10">
                  <textarea
                    id="desc"
                    type="text"
                    className="materialize-textarea"
                    data-length="120"
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                  ></textarea>
                  <label htmlFor="email">Describe yourself</label>
                </div>
                <div className="input-field col s2">
                  <input
                    id="age"
                    type="number"
                    className="validate"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                  />
                  <label htmlFor="email">Age</label>
                </div>
              </div>
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
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="confpassword"
                    type="password"
                    className="validate"
                    value={confpassword}
                    onChange={e => setConfpassword(e.target.value)}
                  />
                  <label htmlFor="confpassword">Confirm password</label>
                </div>
              </div>
              <button className="waves-effect waves-light btn-large green accent-3" type="submit">Register</button>
              <Link to="/login" className="link">Login?</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
