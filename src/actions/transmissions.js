export const createSocket = (socket) =>{
  return{
    type: 'CREATE_SOCKET',
    payload: socket
  }
}

export const sendMsg = (msg) => {
  return {
    type: 'SEND_MESSAGE',
    payload: msg
  }
}

export const receiveMsg = (msg) => {
  return{
    type: 'RECEIVE_MESSAGE',
    payload: msg
  }
}
