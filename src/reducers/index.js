
import { combineReducers } from 'redux'
import messages from './messages_reducer'
import rooms from './rooms_reducer'
import user from './user_reducer'

export default combineReducers({
  messages, rooms, user
});
