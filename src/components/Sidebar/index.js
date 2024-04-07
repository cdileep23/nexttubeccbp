import {Component} from 'react'
import Context from '../../Context/index'
import Section from '../Section'
import './index.css'

const ActiveTabs = ['HOME', 'TRENDING', 'GAMING', 'SAVEDVIDEOS']

const differentTabs = [
  {
    eid: 'HOME',
    displayText: 'Home',
  },
  {
    eid: 'TRENDING',
    displayText: 'Trending',
  },
  {
    eid: 'GAMING',
    displayText: 'Gaming',
  },
  {
    eid: 'SAVEDVIDEOS',
    displayText: 'Saved Videos',
  },
]
class SideBar extends Component {
  state = {
    activeTab: 'HOME',
  }

  render() {
    const {activeTab} = this.state
    return (
      <Context.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <div
              className={
                isDarkTheme
                  ? 'sidebar-container-dark'
                  : 'sidebar-container-light'
              }
            >
              <ul className={isDarkTheme ? 'uList-dark' : 'uList-light'}>
                {differentTabs.map(e => (
                  <Section
                    updateActiveTab={this.updateActiveTab}
                    key={e.eid}
                    isActive={activeTab === e.eid}
                    sectionObj={e}
                  />
                ))}
              </ul>
              <div className="sc-media">
                <h1
                  className={
                    isDarkTheme ? 'contact-us-dark' : 'contact-us-light'
                  }
                >
                  Contact Us
                </h1>

                <div className="social-meadia-handle-container">
                  <img
                    className="social-meadia-handle-icon"
                    alt="facebook logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  />
                  <img
                    className="social-meadia-handle-icon"
                    alt="twitter logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  />
                  <img
                    className="social-meadia-handle-icon"
                    alt="linkedin logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  />
                </div>
                <p className={isDarkTheme ? 'app-desc-dark' : 'app-desc-light'}>
                  Enjoy Now to see Your Channels and Recommendations!
                </p>
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default SideBar
