export default (state = {user: null, loading: false}, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return {...state, loading: true}
    case "LOGIN_USER":
      return {...state, loading: false, user: action.payload}
    default:
      return state;
  }
}
