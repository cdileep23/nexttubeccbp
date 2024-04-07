import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {IoSunnyOutline} from 'react-icons/io5'
import {FaMoon} from 'react-icons/fa'
import Context from '../../Context/index'

import './index.css'

const Header = props => {
  const {history} = props

  const LogoutUser = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <Context.Consumer>
      {value => {
        const {isDarkTheme, setHomeTab, changetheme} = value

        return (
          <div
            className={isDarkTheme ? 'header-cont-dark' : 'header-cont-light'}
          >
            <img
              className="logo"
              src={
                isDarkTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
              }
              alt="NXT Watch Logo"
            />
            <div className="profile-details">
              <button onClick={changetheme} className="icons-button icon">
                {isDarkTheme ? (
                  <IoSunnyOutline className="icon-dark" />
                ) : (
                  <FaMoon className="icon-light" />
                )}
              </button>
              <img
                className="profile-logo"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
                alt="profile"
              />
              <Popup
                trigger={
                  <button className="logout-button-container-light">
                    Logout
                  </button>
                }
                modal
                nested
              >
                {close => (
                  <div className={isDarkTheme ? 'popup-dark' : 'popup-light'}>
                    <div className="content">
                      <p>Are you sure you want to logout?</p>
                    </div>
                    <div className="actions">
                      <button className="btn btn-secondary" onClick={close}>
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setHomeTab()
                          LogoutUser()
                          close()
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
        )
      }}
    </Context.Consumer>
  )
}

export default withRouter(Header)
