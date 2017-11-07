import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import LoadingSpinner from '../components/LoadingSpinner'

const locationHelper = locationHelperBuilder({})

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => state.user.user !== null,
  wrapperDisplayName: 'UserIsAuthenticated',
  AuthenticatingComponent: LoadingSpinner
})

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/chat',
  allowRedirectBack: false,
  authenticatedSelector: state => state.user.user === null,
  AuthenticatingComponent: LoadingSpinner,
  wrapperDisplayName: 'UserIsNotAuthenticated'
})
