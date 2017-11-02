export default (state = {
  loading: false,
  currentLanguage: "en",
  messages: {
    incoming:[],
    outgoing: []
  },
  socket: null
}, action) => {
  switch (action.type) {
    case "CREATE_SOCKET":
      return {...state, socket: action.payload }
    case "SEND_MESSAGE":
      return {...state, messages:{...state.messages, outgoing: [...state.messages.outgoing, action.payload]}};
    case "RECEIVE_MESSAGE":
      return {...state, messages:{...state.messages, incoming: [...state.messages.incoming, action.payload]}};
    default:
      return state;
  }
}
