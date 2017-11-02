import React from 'react';

const ChatDisplay= (props)=>{
  const msgList = props.messages.map((msg, index)=><li key={index}>{`${msg.sender} : ${msg.content}`}</li>)

  return(
    <ul>
      {msgList}
    </ul>
  )
}

export default ChatDisplay
