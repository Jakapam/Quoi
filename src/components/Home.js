import React from 'react'
import { Link } from 'react-router-dom'
import q from '../chatsylogo.png'
import uoi from '../uoi.png'
import { Image } from 'semantic-ui-react'
import StyledSpan from './StyledSpan'



const Home = (props)=>{

  const imgStyle={
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto'
  }

  return(
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)'
    }}>
      <h2 className="animated bounceInUp" style={{fontSize: 40, color: 'white', textAlign: "center"}}>
        Welcome to
      </h2>

      <div>
        <Image style={imgStyle} className="animated rollIn" src={q} size='medium'/>
        <Image style={imgStyle} className="animated zoomInRight" src={uoi} size='medium'/>
      </div>

      <h4 className="animated fadeIn halfSecondDelay" style={{ color: 'white', textAlign: "center"}}>
        Please
        <Link to="/login">
          &nbsp;<StyledSpan text={"Log In"}/>
        </Link>&nbsp;to your account!
      </h4>

      <h4 className="animated fadeIn halfSecondDelay" style={{ color: 'white', textAlign: "center"}}>
        Don't have an account?
        <Link to="/signup">
          &nbsp;<StyledSpan text={"Sign Up"}/>
        </Link>
        !
      </h4>

      <h4 className="animated fadeIn" style={{ color: 'white', textAlign: "center", fontWeight: 'bold'}}>
        <Link className="animated fadeIn halfSecondDelay" to='/interpreter'>
          <StyledSpan text={"Speech"}/>
        </Link>
      </h4>
    </div>
  )

}

export default Home
