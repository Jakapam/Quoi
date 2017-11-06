import React from 'react'
import { List } from 'semantic-ui-react'

const MsgItemOutGoing= (props)=>{

  const itemStyle = {
    marginTop: 5,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#2b252e',
    color: 'white',
    padding: 5,
    fontSize: 20
  }

  return(
    <List.Item>
      <List.Content floated='right' style={itemStyle}>
        <span>{props.msg.content}</span>
      </List.Content>
    </List.Item>
  )
}

export default MsgItemOutGoing
