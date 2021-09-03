import { loginAPI } from './../api/api'

const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"

let initialState = {
  user: {},
  isAuth: false
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: { ...action.payload },
        isAuth: true
      }
    case LOGOUT:
      return {
        ...state,
        user: {},
        isAuth: false
      }
    default:
      return state
  }
}

export const loginAC = (user) => { return { type: LOGIN, payload: user } }
export const logout = () => { return { type: LOGOUT } }

export const loginThunk = (email, password) => async dispatch => {
  let res = await loginAPI(email, password)
  dispatch(loginAC(res.data.user))
  localStorage.setItem("token", res.data.token)
}