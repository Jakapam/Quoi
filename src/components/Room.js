import React from 'react';
import MessageInput from '../containers/MessageInput'
import LanguageSelector from '../containers/LanguageSelector'
import MsgList from './MsgList'
import { Container, Grid } from 'semantic-ui-react'

const Room = (props)=>{
  return(
    <div style={{marginTop: 30}}>
      <Container>
        <MsgList incoming={props.incoming} outgoing={props.outgoing}/>
        <Grid>
          <Grid.Row>
            <Grid.Column width={11} floated='right'>
              <MessageInput/>
            </Grid.Column>
            <Grid.Column width={5} floated='right'>
              <LanguageSelector />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  )
}

export default Room
