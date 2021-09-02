import { getPostsAPI } from './../api/api'

const SET_POSTS = "SET_POSTS"

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
    default:
      return state
  }
}

const setPostsAC = (posts) => { return { type: SET_POSTS, payload: posts } }

export const setPostsThunk = () => async dispatch => {
  try {
    let res = await getPostsAPI()
    dispatch(setPostsAC(res.data.posts))
  } catch (e) {
    alert(e)
  }
}