import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { authReducer } from "./authReducer"

const rootReducers = combineReducers({
  auth: authReducer
})

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))

export default store