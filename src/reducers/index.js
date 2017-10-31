
import { combineReducers } from 'redux'
import messages from './messages_reducer'
import rooms from './rooms_reducer'

export default combineReducers({
  messages, rooms
});
