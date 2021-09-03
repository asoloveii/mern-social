import React, { useState } from 'react'
import './post.scss'
import { useSelector, useDispatch } from 'react-redux'
import { format } from "timeago.js"
import { commentPostThunk, likePostThunk } from './../../store/postsReducer'

export default function Post({ post }) {
  const author = useSelector(state => state.users.users).filter(u => u._id === post.author)[0]
  const user = useSelector(state => state.auth.user)

  const dispatch = useDispatch()

  const [likes, setLikes] = useState(post.likes.length)
  const [comments, setComments] = useState(post.comments.length)
  const [desc, setDesc] = useState("")
  const [openCommentBar, setOpenCommentBar] = useState(false)

  const likePostHandler = () => {
    setLikes(post.likes.includes(user._id) ? likes - 1 : likes + 1)
    dispatch(likePostThunk(post._id, user._id))
  }

  const commentPostHandler = () => {
    setComments(comments + 1)
    dispatch(commentPostThunk(post._id, desc))
  }

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
        <div className="icon-counter-wrapper">
          <i className="material-icons icon" onClick={likePostHandler}>thumb_up</i><span>{likes}</span>
        </div>
        <div className="icon-counter-wrapper">
          <i className="material-icons icon">chat</i><span>{post.comments.length}</span>
        </div>
      </div>
      <div className="post__leave_comment">
        <span>Comments:</span>
        <div>
          {/* TODO COMMENTS */}
        </div>
        <input type="text" name="comment" value={desc} onChange={e => setDesc(e.target.value)} />
        <button onClick={commentPostHandler}>Comment!</button>
      </div>
    </div>
  )
}
