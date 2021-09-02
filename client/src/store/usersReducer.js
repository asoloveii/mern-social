import { getUsersAPI } from './../api/api'

const SET_USERS = "SET_USERS"

let initialState = {
  users: []
}

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state
  }
}

const setUsersAC = (users) => { return { type: SET_USERS, payload: users } }

export const setUsersThunk = () => async dispatch => {
  try {
    let res = await getUsersAPI()
    dispatch(setUsersAC(res.data.users))
  } catch (e) {
    alert(e)
  }
}