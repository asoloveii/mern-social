import React from 'react'
import { Link } from 'react-router-dom'
import "./header.scss"
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './../../store/authReducer';

export default function Header() {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    localStorage.removeItem("token")
  }

  return (
    <nav className="header-container green accent-3">
      <div className="nav-wrapper header">
        <Link to="/" className="brand-logo">Logo</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/profile">
              {user.profilePic ? (
                <img src={`/uploads/${user.profilePic}`} alt="" />
              ) : (
                <i className="material-icons icons">account_circle</i>
              )}
            </Link>
          </li>
          <li>
            <Link to="/" onClick={logoutHandler}>
              <i className="material-icons icons">logout</i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
