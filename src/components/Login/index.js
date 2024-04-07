import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import {Redirect} from 'react-router-dom'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isCheckBoxchecked: false,
    errorMsg: '',
    errorMsgExists: false,
  }

  setJWTToken = data => {
    const {history} = this.props
    const jwtToken = data

    this.setState({errorMsgExists: false})
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  verifyUser = async event => {
    const {username, password} = this.state
    event.preventDefault()
    console.log('Checking User')

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const result = await fetch(url, options)
    const data = await result.json()
    if (result.ok === true) {
      console.log(data)
      this.setJWTToken(data)
    } else {
      console.log(data)
      this.setState(e => ({
        errorMsg: data.error_msg,
        errorMsgExists: !e.errorMsgExists,
      }))
    }
  }

  updateUserName = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  updateCheckBox = () => {
    this.setState(e => ({isCheckBoxchecked: !e.isCheckBoxchecked}))
  }

  render() {
    const {
      username,
      password,
      isCheckBoxchecked,
      errorMsg,
      errorMsgExists,
    } = this.state
    const isDarkTheme = false

    const jwt = Cookies.get('jwt_token')
    if (jwt !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className={isDarkTheme ? 'bg-cont-dark' : 'bg-cont-light'}>
        <form
          onSubmit={this.verifyUser}
          className={isDarkTheme ? 'login-card-dark' : 'login-card-light'}
        >
          <img
            className="nxtube-logo"
            alt="logo"
            src={
              isDarkTheme
                ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            }
          />

          <div className="input-containers">
            <label htmlFor="username" className="label-text">
              USERNAME
            </label>
            <br />
            <input
              value={username}
              onChange={this.updateUserName}
              placeholder="USERNAME"
              id="username"
              className={isDarkTheme ? 'input-element-dark' : 'input-element'}
              type="text"
            />
          </div>
          <div className="input-containers">
            <label htmlFor="password" className="label-text">
              PASSWORD
            </label>
            <br />
            <input
              value={password}
              onChange={this.updatePassword}
              placeholder="PASSWORD"
              id="password"
              className={isDarkTheme ? 'input-element-dark' : 'input-element'}
              type={isCheckBoxchecked ? 'text' : 'password'}
            />
          </div>

          <div className="check-box-container">
            <input
              onChange={this.updateCheckBox}
              id="checkBox"
              type="checkbox"
            />
            <label htmlFor="checkBox">Show password</label>
          </div>

          <button className="login-button" type="submit">
            Login
          </button>

          {errorMsgExists && <p className="error-msg">`*{errorMsg}`</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
