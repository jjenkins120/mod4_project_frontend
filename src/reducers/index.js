import { combineReducers } from 'redux'
import notes from './notes'
import users from './users'

export default combineReducers({
  notes,
  users
})