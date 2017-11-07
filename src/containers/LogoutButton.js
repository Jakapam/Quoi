import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logout } from '../actions/users'
import { Button } from 'semantic-ui-react'

class LogoutButton extends Component{
  render(){
    return <Button style={{marginRight: 40, marginTop: 25, zIndex: '-1'}} floated='right' onClick={this.props.logout}>Logout</Button>
  }
}

export default connect(null, {logout})(LogoutButton)
