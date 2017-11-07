import React, { Component } from 'react'
import { setLanguage } from '../actions/languages'
import { Dropdown } from 'semantic-ui-react'
import { receiveMsg } from '../actions/transmissions'
import { connect } from 'react-redux';

class LanguageSelector extends Component{

  handleChange = (event, {value}) =>{

    const currentLang = this.props.languages.find((lang)=>{
      return lang.code === value
    })

    this.props.socket.off(`chatMsg-${this.props.currentLanguage}`)
    this.props.socket.on(`chatMsg-${value}`, (msg)=>{
      this.props.receiveMsg(msg)
    })

    this.props.setLanguage(value)
    this.props.socket.emit('setLanguage', {code: value, name: currentLang.name});
  }

  render(){
    const languageOptions = this.props.languages.map((language, index)=>{
      return {value:language.code, key:language.name, text: language.name}
    })


    return(
      <Dropdown
        onChange={this.handleChange}
        upward
        button
        className='icon'
        floated='right'
        labeled
        icon='world'
        placeholder='Select Language'
        options={languageOptions}
        search
      />
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

export default connect(mapStateToProps, { setLanguage, receiveMsg })(LanguageSelector)
