import React, { Component } from 'react'
import { setLanguage } from '../actions/languages'
import { receiveMsg } from '../actions/transmissions'
import { connect } from 'react-redux';

class LanguageSelector extends Component{

  handleChange = (event) =>{
    this.props.socket.off(`chatMsg-${this.props.currentLanguage}`)
    this.props.socket.on(`chatMsg-${event.target.value}`, (msg)=>{
      this.props.receiveMsg(msg)
    })

    this.props.setLanguage(event.target.value)
    this.props.socket.emit('setLanguage', event.target.value);
  }

  render(){

    console.log(this.props.socket._callbacks)

    const languageOptions = this.props.languages.map((language, index)=>{
      return <option value={language.code} key={index}>{language.name}</option>
    })


    return(
      <select onChange={this.handleChange}>
        {languageOptions}
      </select>
    )
  }

}

const mapStateToProps = (state)=>{
  return {
    currentLanguage: state.languages.currentLanguage,
    languages: state.languages.supportedLanguages,
    socket: state.transmissions.socket
  }
}

export default connect(mapStateToProps, { setLanguage,receiveMsg })(LanguageSelector)
