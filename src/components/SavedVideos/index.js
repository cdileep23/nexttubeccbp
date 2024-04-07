import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {HiSave} from 'react-icons/hi'
import Context from '../../Context/index'
import TrendingVideoCard from '../TrendingVideoCard/index'
import Header from '../Header/index'

import VideoCard from '../VideoCard/index'
import './index.css'

import SideBar from '../Sidebar/index'

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
const FetchStatuses = ['EXECUTING', 'SUCCESSFUL', 'FAILURE']
class SavedVideos extends Component {
  state = {
    SavedvideosList: [],
  }

  render() {
    const {activeTab} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <Context.Consumer>
        {value => {
          const {isDarkTheme, SavedVideosList} = value
          console.log(SavedVideosList)
          return (
            <div
              className={
                isDarkTheme ? 'home-main-container-dark' : 'home-main-container'
              }
            >
              <Header />
              <div className="main-content-container">
                <SideBar />

                <div
                  className={
                    isDarkTheme
                      ? 'videos-container-dark'
                      : 'videos-container-light'
                  }
                >
                  <div
                    className={
                      isDarkTheme
                        ? 'videos-container-dark'
                        : 'videos-container-light'
                    }
                  >
                    <div
                      className={
                        isDarkTheme
                          ? 'trending-head-container-dark'
                          : 'trending-head-container-light'
                      }
                    >
                      <HiSave className="trending-icon" />
                      <h1
                        className={
                          isDarkTheme
                            ? 'trending-heading-dark'
                            : 'trending-heading-light'
                        }
                      >
                        Saved Videos
                      </h1>
                    </div>
                    {SavedVideosList.length === 0 ? (
                      <div className="no-savedvideos-container">
                        <img
                          className="no-saved-videos-image"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                        />
                      </div>
                    ) : (
                      <ul className="savedVideosList">
                        {SavedVideosList.map(e => (
                          <TrendingVideoCard videoObj={e} />
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default SavedVideos
