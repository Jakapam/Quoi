import openSocket from 'socket.io-client'
import { webSocketEndPoint } from '../utils/url_config'

export default (state = {
  loading: false,
  currentLanguage: "en",
  messages: {
    incoming:[],
    outgoing: [],
    system: []
  },
  socket: null
}, action) => {
  switch (action.type) {
    case "CREATE_SOCKET":
      const socket = openSocket(`${webSocketEndPoint}`)
      return {...state, socket: socket}
    case "SEND_MESSAGE":
      return {...state, messages:{...state.messages, outgoing: [...state.messages.outgoing, action.payload]}};
    case "RECEIVE_MESSAGE":
      return {...state, messages:{...state.messages, incoming: [...state.messages.incoming, action.payload]}};
    case "SYSTEM_MESSAGE":
      return {...state, messages:{...state.messages, system: [...state.messages.system, action.payload]}};
    default:
      return state;
  }
}
