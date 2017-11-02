export default (state = {currentLanguage: "en", supportedLanguages: [], loadingLanguages: false}, action) => {
  switch (action.type) {
    case "SET_LANGUAGE":
      return {...state, currentLanguage: action.payload}
    case "FETCH_LANGUAGES":
      return {...state, loadingLanguages: true}
    case "ADD_LANGUAGES":
      return {...state, loadingLanguages: false, supportedLanguages: action.payload }
    default:
      return state;
  }
}
