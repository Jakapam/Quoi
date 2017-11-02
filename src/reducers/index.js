
import { combineReducers } from 'redux'
import transmissions from './transmissions_reducer'
import rooms from './rooms_reducer'
import user from './user_reducer'
import languages from './languages_reducer'

export default combineReducers({
  transmissions, rooms, user, languages
});
