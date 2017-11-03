import React from 'react';
import MsgItemIncoming from './MsgItemIncoming'
import MsgItemOutgoing from './MsgItemOutgoing'
import { List } from 'semantic-ui-react'


const MsgList= (props)=>{

  const incoming = props.incoming.map((msg, index)=>{
    return <MsgItemIncoming key={msg.timestamp} msg={msg}/>
  })

  const outgoing = props.outgoing.map((msg, index)=>{
    return <MsgItemOutgoing key={msg.timestamp} msg={msg}/>
  })

  const msgList = [...incoming, ...outgoing].sort((msgA, msgB)=> {return msgA.props.msg.timestamp - msgB.props.msg.timestamp})

  return(
    <div style={{height: '75vh', overflow: 'auto', backgroundColor: 'white', borderRadius: '2%', margin: 10}}>
      <List>
        {msgList}
      </List>
    </div>
  )
}

export default MsgList
