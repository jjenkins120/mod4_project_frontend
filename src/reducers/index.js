import { combineReducers } from 'redux'
import notes from './notes'
import user from './user'

export default combineReducers({
  notes,
  user
})