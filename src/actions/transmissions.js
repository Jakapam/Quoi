export const createSocket = () => {
  return {
    type: "CREATE_SOCKET"
  };
};

export const fetchOwnMessages = username => {
  return dispatch => {
    fetch("/Room1/messages")
      .then(res => res.json())
      .then(data => {
        const fetchedMessages = data.messages.filter(msg => {
          return msg.sender === username;
        });
        dispatch({ type: "RETRIEVE_MSGS", payload: fetchedMessages });
      });
  };
};

export const handleIncomingBulkMsgs = bulkMsgs => {
  return {
    type: "CONSUME_BULK_MSGS",
    payload: bulkMsgs
  };
};

export const sendMsg = msg => {
  return {
    type: "SEND_MESSAGE",
    payload: msg
  };
};

export const receiveMsg = msg => {
  return {
    type: "RECEIVE_MESSAGE",
    payload: msg
  };
};
export const systemMsg = msg => {
  return {
    type: "SYSTEM_MESSAGE",
    payload: msg
  };
};
