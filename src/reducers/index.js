
import { combineReducers } from 'redux'
import transmissions from './transmissions_reducer'
import rooms from './rooms_reducer'
import user from './user_reducer'
import languages from './languages_reducer'


const appReducer = combineReducers({
  transmissions, rooms, user, languages
});

export default ( state, action ) =>{

  if(action.type === 'LOGOUT_USER'){
    state.transmissions.socket.disconnect()
    state = undefined;
    localStorage.removeItem('token');
  }

  return appReducer(state,action)

}
