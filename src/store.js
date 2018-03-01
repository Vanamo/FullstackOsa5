import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import allUsersReducer from './reducers/allUsersReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  blogs: blogReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store