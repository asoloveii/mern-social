import React from 'react'
import './post.scss'
import { useSelector } from 'react-redux'
import { format } from "timeago.js"

export default function Post({ post }) {
  const author = useSelector(state => state.users.users).filter(u => u._id === post.author)[0]

  return (
    <div className="post">
      <div className="post__info">
        <img src="/images/profileDefault.png" alt="profile" className="profilePic" />
        <span className="name">{author.name.firstname} {author.name.lastname}</span>
        <span className="date">{format(post.createdAt, 'en_US')}</span>
      </div>
      <div className="post__main">
        {post.picture
          ? <img src={`/uploads/${post.picture}`} alt="" />
          : <i className="material-icons">person</i>}
        <p>{post.desc}</p>
      </div>
      <div className="post__buttons">
        <div className="icon-counter-wrapper"><i className="material-icons icon">thumb_up</i><span>{post.likes.length}</span></div>
        <div className="icon-counter-wrapper">
          <i className="material-icons icon">chat</i><span>{post.comments.length}</span>
        </div>

      </div>
    </div>
  )
}
