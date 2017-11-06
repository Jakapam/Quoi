export const signUp = (signUpInfo)=>{
  return(dispatch)=>{

    dispatch({ type: 'LOAD_USER' });

    const userToSignUp = JSON.stringify(signUpInfo)
    return fetch('http://localhost:8080/users/', {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: userToSignUp
    })
      .then(res => res.json())
      .then( data =>{
        localStorage.setItem('token', data.jwt)
        const userData = {
          username: data.username,
          id: data.id
        }
        dispatch({ type: 'LOGIN_USER', payload: userData})
      })
      .catch(error=>console.log(error))
  }
}


export const login = (loginInfo)=>{
  return(dispatch)=>{

    dispatch({ type: 'LOAD_USER' });

    const userToLogin = JSON.stringify(loginInfo)
    return fetch('http://localhost:8080/login/', {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: userToLogin
    })
      .then(res => res.json())
      .then( data =>{
        if(data.error){
          console.log("Login error: ", data.error)
        } else {
          localStorage.setItem('token', data.jwt)
          const userData = {
            username: data.username,
            id: data.id
          }
          dispatch({ type: 'LOGIN_USER', payload: userData})
        }
      })
      .catch(error=>{
        console.log("Error in Login")
      })
  }
}

export const setUser = (token)=>{
  return(dispatch)=>{

    dispatch({ type: 'LOAD_USER' });

    const token = localStorage.getItem('token')

    return fetch('http://localhost:8080/user/', {
      headers: {'authorization': token},
    })
      .then(res => res.json())
      .then( data =>{
        if(data.error){
          console.log("Login error: ", data.error)
        } else {
          const userData = {
            username: data.username,
            id: data.id
          }
          dispatch({ type: 'LOGIN_USER', payload: userData})
        }
      })
      .catch(error=>{
        console.log("Error Setting User")
      })
  }
}