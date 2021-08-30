import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

const rootReducers = combineReducers({})

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))

export default store