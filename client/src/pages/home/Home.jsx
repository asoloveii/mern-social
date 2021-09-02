import React, { useEffect, useState } from 'react'
import './home.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setPostsThunk } from '../../store/postsReducer'
import { setUsersThunk } from '../../store/usersReducer'
import Post from './../../components/post/Post'

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPostsThunk())
    dispatch(setUsersThunk())
  }, [])

  const posts = useSelector(state => state.posts.posts)

  return (
    <>
      <CreatePost />
      <div>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </>
  )
}

export const CreatePost = () => {
  const user = useSelector(state => state.auth.user)
  const [desc, setDesc] = useState("")
  const [photo, setPhoto] = useState(null)

  const submitHandler = (e) => {
    e.preventDefault()

    const formdata = new FormData()

    formdata.append("author", user._id)
    formdata.append("desc", desc)
    formdata.append("photo", photo)

    try {
      // TODO
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div className="form-post">
      <form className="form" onSubmit={submitHandler}>
        <div className="wrapper">
          {user.profilePic
            ? <img className="profilePic" src={`/uploads/${user.profilePic}`} alt="Profile" />
            : <i className="material-icons icon" >account_circle</i>}
          <input
            className="validate input"
            id="desc"
            name="desc"
            value={desc}
            placeholder="What's happenning?"
            onChange={e => setDesc(e.target.value)}
          />
          <>
            <input id="photo" name="photo" type="file" style={{ display: "none" }} onChange={e => setPhoto(e.target.files[0])} />
            <label htmlFor="photo" style={{ color: "inherit" }}><i className="material-icons icon">add_a_photo</i></label>
          </>
        </div>
        <button type="submit" className="btn submit">Publish!</button>
      </form>
    </div>
  )
}
