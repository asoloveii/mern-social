import React, { useEffect, useState } from 'react'
import './home.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setPostsThunk } from '../../store/postsReducer'
import { setUsersThunk } from '../../store/usersReducer'
import Post from './../../components/post/Post'
import { addPostThunk } from './../../store/postsReducer'

export default function Home() {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(setPostsThunk())
    dispatch(setUsersThunk())
    setLoading(false)
  }, [])

  const posts = useSelector(state => state.posts.posts)

  return (
    <>
      {
        loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-green-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div><div className="gap-patch">
                  <div className="circle"></div>
                </div><div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
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
    </>
  )
}

export const CreatePost = () => {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const [desc, setDesc] = useState("")
  const [photo, setPhoto] = useState(null)

  const submitHandler = (e) => {
    e.preventDefault()

    const formdata = new FormData()

    formdata.append("author", user._id)
    formdata.append("desc", desc)
    formdata.append("picture", photo)

    try {
      dispatch(addPostThunk(formdata))
      setDesc("")
    } catch (e) {
      console.log(e)
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
            <input id="picture" name="picture" type="file" style={{ display: "none" }}
              onChange={e => setPhoto(e.target.files[0])} />
            <label htmlFor="picture" style={{ color: "inherit" }}><i className="material-icons icon">add_a_photo</i></label>
          </>
        </div>
        <button type="submit" className="btn submit">Publish!</button>
      </form>
    </div>
  )
}
