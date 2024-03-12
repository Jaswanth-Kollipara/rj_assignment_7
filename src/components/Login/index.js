import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import JobContext from '../../context/JobContext'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitErrorMessage: false,
    errorMessage: '',
    isClicked: false,
  }

  onChangeUser = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickShow = event => {
    this.setState({isClicked: event.target.checked})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({showSubmitErrorMessage: true, errorMessage})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username === '') {
      this.setState({
        errorMessage: 'User Name Required',
        showSubmitErrorMessage: true,
      })
    }
    if (password === '') {
      this.setState({
        errorMessage: 'User Name Password',
        showSubmitErrorMessage: true,
      })
    }
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      showSubmitErrorMessage,
      errorMessage,
      isClicked,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <JobContext.Consumer>
        {value => {
          const {isDark} = value
          const bgColor = isDark ? 'dark' : 'light'
          const logo = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

          return (
            <div className={bgColor}>
              <form onSubmit={this.onSubmitForm}>
                <img src={logo} alt="website logo" />
                <label htmlFor="lb1">USERNAME</label>
                <input
                  id="lb1"
                  type="text"
                  value={username}
                  onChange={this.onChangeUser}
                />
                <label htmlFor="lb2">PASSWORD</label>
                {isClicked && (
                  <input
                    id="lb2"
                    type="text"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                )}
                {!isClicked && (
                  <input
                    id="lb2"
                    type="password"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                )}
                <input type="checkbox" id="lb3" onClick={this.onClickShow} />
                <label htmlFor="lb3">Show Password</label>
                <button type="submit">Login</button>
                {showSubmitErrorMessage && <p>*{errorMessage}</p>}
              </form>
            </div>
          )
        }}
      </JobContext.Consumer>
    )
  }
}

export default Login
