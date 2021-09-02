import React from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function Navbar() {
  const friendsId = useSelector(state => state.auth.user.friends)
  const friends = useSelector(state => state.users.users).filter(f => !friendsId.includes(f._id))
  console.log(friends)

  return (
    <div className="navbar">
      <div className="navbar__links">
        <ul>
          <li>
            <i className="material-icons icon">home</i><Link to="/" className="link">Home</Link>
          </li>
          <li>
            <i className="material-icons icon">person</i><Link to="/profile" className="link">Profile</Link>
          </li>
          <li>
            <i className="material-icons icon">chat</i><Link to="/chat" className="link">Chat</Link>
          </li>
          <li>
            <i className="material-icons icon">chat</i><Link to="/search" className="link">Search</Link>
          </li>
          <li>
            <i className="material-icons icon">people</i><Link to="/friends" className="link">Friends</Link>
          </li>
        </ul>
      </div>
      <div className="navbar__friendsonline">
        <span>Friends</span>
        {friends ? (
          friends.map((friend, index) => (
            <Friend key={index} friend={friend} />
          ))
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img src="/images/profilePic.png" style={{ width: "100px" }} alt="" />
            <p>You don't have any friends</p>
          </div>
        )}
      </div>
    </div>
  )
}

export const Friend = ({ friend }) => {
  return (
    <div style={{ margin: "10px 0", display: "flex", alignItems: "center", cursor: "pointer" }}>
      <img style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%", marginRight: "15px" }}
        src={friend.photo.profilePic ? `/uploads/${friend.photo.profilePic}` : "/images/friendOnline.jpeg"} alt="Friend" />
      <span style={{ fontSize: "24px" }}>{friend.name.firstname} {friend.name.lastname}</span>
    </div>
  )
}
