import React from 'react'
import { Loader } from 'semantic-ui-react'


const LoadingSpinner = (props)=>{

  return(
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)'
    }}>
      <Loader size='massive'>Loading</Loader>
    </div>
  )

}

export default LoadingSpinner
