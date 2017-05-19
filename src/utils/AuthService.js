import Auth0Lock from 'auth0-lock'

class AuthService {
  constructor() {
    // Configure Auth0
    this.lock = new Auth0Lock('Qw7Pr6d0lWqyDldL8TDFYikzGMzWIQ4L', 'nathaniel-j.auth0.com', {
      auth: {
        redirectUrl: 'http://138.68.229.153:3000/welcome',
        responseType: 'token'
      }
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken)
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.clear();
    localStorage.removeItem('id_token');
  }
}

export default new AuthService();
