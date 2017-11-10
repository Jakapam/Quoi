import React, { Component } from 'react'
import { Image, Dropdown
 } from 'semantic-ui-react'
import logo from '../chatsylogo.png'
import { connect } from 'react-redux';

const SpeechRecognition = window.webkitSpeechRecognition

class SpeechTranslator extends Component{

  state={
    recognition: null,
    currentText: " ",
    translatedText: " ",
    outputLang: 'en',
    inputLang: 'en',
    listening: false
  }

  componentDidMount(){
    let recognition = new SpeechRecognition()
    recognition.continuous = true;
    recognition.lang = 'en';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      let final_transcript =''

      for (var i = event.resultIndex; i < event.results.length; ++i) {
       if (event.results[i].isFinal) {
         final_transcript += event.results[i][0].transcript;
       }
     }

     this.setState({
       currentText: final_transcript,
     },()=>{

       const fetchMessage = {
         speechToInterpret: this.state.currentText,
         outputLang: this.state.outputLang
        }

       fetch('/interpret', {method: 'POST', headers: {'content-type':'application/json'},
       body: JSON.stringify(fetchMessage)
     })
     .then(res=>res.json())
     .then(data=>{
       console.log(data)
       this.setState({
         translatedText: data.translatedSpeech.translation
       })
     })
     .catch(error=>this.setState({ errors: error.toString()}))
   })

   }
   this.setState({
     recognition: recognition
   })
 }

 handleTouchStart = (event)=>{
   event.preventDefault();

   this.setState({
     listening: !this.state.listening
   })

   if(!this.state.listening){
     this.state.recognition.start();
   } else {
     this.state.recognition.stop();
   }

 }

 handleTouchEnd = (event)=>{
   event.preventDefault();
  //  this.state.recognition.stop();
  //  this.setState({
  //    lastInteraction: "Touch End"
  //  })
 }

 onDown = (event)=>{
   event.preventDefault();
   this.state.recognition.start();
   console.log('Dictating.');
   this.setState({
     lastInteraction: "Mouse Down"
   })
 }

 onUp = (event)=>{
   event.preventDefault();
   this.state.recognition.stop();
   console.log('End Dictation')

   this.setState({
     lastInteraction: "Mouse Up"
   })
 }

 handleOuputChange = (event, {value})=>{
   console.log("output")
   this.setState({
     outputLang: value
   })
 }

handleInputChange = (event, {value})=>{
  console.log("input")
  this.setState({
    inputLang: value
  },()=>{
    this.state.recognition.lang = this.state.inputLang
  })
}

 handleContextMenu = (event)=>{
   event.preventDefault()
 }

  render(){
  debugger;
    console.log(this.state.outputLang)

  const languageOptions = this.props.languages.map((language, index)=>{
    return {value:language.code, key:language.name, text: language.name}
  })

  const listeningStyle= !this.state.listening ? {
    visibility: 'hidden'
  } : null;


    return(
      <div className="animated fadeIn">
        <div style={{ color: 'white', textAlign: "center", fontWeight: 'bold', position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)'}}>
          <h2 style={listeningStyle}>Listening
            <span className="animated fadeIn quarterSecondDelay infinite">.</span>
            <span className="animated fadeIn halfSecondDelay infinite">.</span>
            <span className="animated fadeIn threeQuarterSecondDelay infinite">.</span></h2>
          <Image
            className={this.state.listening ? 'animated pulse infinite' : null}
            src={logo}
            size='large'
            onMouseDown={this.onDown}
            onMouseUp={this.onUp}
            onTouchStart= {this.handleTouchStart}
            onTouchEnd= {this.handleTouchEnd}
            onContextMenu= {this.handleContextMenu}
          />
          <p style={{fontWeight: 'normal'}}>What I think you said:</p> <p style={{fontSize: 20}}>&nbsp;{this.state.currentText}&nbsp;</p>
          <p style={{fontWeight: 'normal'}}>Translation:</p> <p style={{fontSize: 20}}>&nbsp;{this.state.translatedText}&nbsp;</p>
        </div>
        <Dropdown
          onChange={this.handleInputChange}
          className='icon'
          labeled
          placeholder="Select input language"
          icon='user'
          options={languageOptions}
        />
        <Dropdown
          onChange={this.handleOuputChange}
          className='icon'
          labeled
          placeholder="Select output language"
          icon='world'
          options={languageOptions}
        />
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    languages: state.languages.supportedLanguages
  }
}

export default connect(mapStateToProps)(SpeechTranslator)
