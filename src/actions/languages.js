import { dataApiEndPoint } from '../utils/url_config'

export const setLanguage = (lang) =>{
    return{
      type: 'SET_LANGUAGE',
      payload: lang
    }
}

export const fetchLanguages = () =>{
  return(dispatch)=>{
    dispatch({ type: 'FETCH_LANGUAGES' });
    return fetch(`${dataApiEndPoint}/languages/`)
      .then(res => res.json())
      .then( data => dispatch({ type: 'ADD_LANGUAGES', payload: data.supportedLanguages}))
  }
}
