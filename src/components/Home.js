import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../chatsylogo.png'
import { Image } from 'semantic-ui-react'
import StyledSpan from './StyledSpan'



const Home = (props)=>{

  return(
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)'
    }}>
      <h2 className="animated bounceInUp" style={{fontSize: 40, color: 'white', textAlign: "center"}}>Welcome to globeChatter!</h2>
      <Image className="animated rollIn" src={logo} size='large'/>
      <h4 className="animated fadeIn halfSecondDelay" style={{ color: 'white', textAlign: "center"}}>Please<Link to="/login">&nbsp;<StyledSpan text={"Log In"}/></Link>&nbsp;to your account!</h4>
      <h4 className="animated fadeIn halfSecondDelay" style={{ color: 'white', textAlign: "center"}}>Don't have an account?<Link to="/signup">&nbsp;<StyledSpan text={"Sign Up"}/></Link>!</h4>
    </div>
  )

}

export default Home
