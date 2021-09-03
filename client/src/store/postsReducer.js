import { commentPostAPI, createPostAPI, getPostsAPI, likePostAPI } from './../api/api'

const SET_POSTS = "SET_POSTS"
const ADD_POST = "ADD_POST"
const LIKE_POST = "LIKE_POST"
const COMMENT_POST = "COMMENT_POST"

let initialState = {
  posts: []
}

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    case LIKE_POST:
      const newState = { ...state }
      newState.posts.find(post => post._id === action.payload.postId).likes.push(action.payload.userId)
      return {
        ...newState
      }
    default:
      return state
  }
}

export const setPostsAC = (posts) => { return { type: SET_POSTS, payload: posts } }
export const addPostAC = (post) => { return { type: ADD_POST, payload: post } }
export const likePostAC = (postId, userId) => { return { type: ADD_POST, payload: { postId, userId } } }
export const commentPostAC = (postId, commentId) => { return { type: COMMENT_POST, payload: { postId, commentId } } }

export const setPostsThunk = () => async dispatch => {
  try {
    let res = await getPostsAPI()
    dispatch(setPostsAC(res.data.posts))
  } catch (e) {
    alert(e)
  }
}

export const addPostThunk = (data) => async dispatch => {
  try {
    let res = await createPostAPI(data)
    dispatch(addPostAC(res.data.post))
  } catch (e) {
    alert(e)
  }
}

export const likePostThunk = (postId, userId) => async dispatch => {
  try {
    await likePostAPI(postId)
    dispatch(likePostAC(postId, userId))
  } catch (e) {
    alert(e)
  }
}

export const commentPostThunk = (postId, data) => async dispatch => {
  try {
    let res = await commentPostAPI(postId, data)
    dispatch(commentPostAC(postId, res.data.comment._id))
  } catch (e) {
    alert(e)
  }
}
