export const setLanguage = (lang) =>{
    return{
      type: 'SET_LANGUAGE',
      payload: lang
    }
}

export const fetchLanguages = () =>{
  return(dispatch)=>{
    dispatch({ type: 'FETCH_LANGUAGES' });
    return fetch('http://localhost:8080/languages/all')
      .then(res => res.json())
      .then( data => dispatch({ type: 'ADD_LANGUAGES', payload: data.supportedLanguages}))
  }
}
