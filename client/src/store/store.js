import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { authReducer } from "./authReducer"
import { usersReducer } from "./usersReducer"
import { postsReducer } from './postsReducer';

const rootReducers = combineReducers({
  auth: authReducer,
  users: usersReducer,
  posts: postsReducer
})

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))

export default store