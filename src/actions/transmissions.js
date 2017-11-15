export const createSocket = () => {
  return {
    type: "CREATE_SOCKET"
  };
};

export const handleOutgoingBulkMsgs = bulkMsgs => {
  return {
    type: "CONSUME_OUTGOING_BULK_MSGS",
    payload: bulkMsgs
  };
};

export const handleIncomingBulkMsgs = bulkMsgs => {
  return {
    type: "CONSUME_INCOMING_BULK_MSGS",
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
