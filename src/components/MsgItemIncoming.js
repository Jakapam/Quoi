import React from 'react'
import { List } from 'semantic-ui-react'

const MsgItemIncoming= (props)=>{

  const itemStyle = {
    marginTop: 5,
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: '#696969',
    color: 'white',
    padding: 5,
    fontSize: 20
  }

  return(
    <List.Item>
        <List.Content floated='left' style={itemStyle}>
          <span style={{color: '#C0C0C0'}}>{props.msg.sender}: </span>
          <span>{props.msg.content }</span>
        </List.Content>
    </List.Item>
  )
}

export default MsgItemIncoming
