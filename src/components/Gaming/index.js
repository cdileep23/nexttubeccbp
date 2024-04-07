import Cookies from 'js-cookie'
import {Component} from 'react'
import {SiYoutubegaming} from 'react-icons/si'

import {Redirect} from 'react-router-dom'
import {ThreeDots} from 'react-loader-spinner'
import Context from '../../Context/index'
import Header from '../Header/index'
import GAMINGCARD from '../GAMINGCARD/index'
import './index.css'

import SideBar from '../Sidebar/index'

const FetchStatuses = ['EXECUTING', 'SUCCESSFUL', 'FAILURE']
class Gaming extends Component {
  state = {
    videosList: [],
    fetchStatus: FetchStatuses[0],
    searchValinput: '',
  }

  componentDidMount = () => {
    this.renderesult()
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderVideos = () => {
    console.log('hello')
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case FetchStatuses[0]:
        return this.renderLoader()
      case FetchStatuses[1]:
        return this.renderVideosContent()
      case FetchStatuses[2]:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderAgainInFailureView = () => {
    this.setState({fetchStatus: FetchStatuses[0]}, this.renderesult)
  }

  renderFailureView = () => (
    <Context.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <>
            <div className="no-found-conatiner">
              <img
                alt="not-found"
                className="nofoundImage"
                src={
                  isDarkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                }
              />
            </div>
            <div className="retry-btn-container">
              <button
                type="button"
                className="retrybtn"
                onClick={this.renderAgainInFailureView}
              >
                Retry
              </button>
            </div>
          </>
        )
      }}
    </Context.Consumer>
  )

  renderVideosContent = () => {
    const {videosList, searchValinput} = this.state
    const searchedVideos = videosList.filter(e =>
      e.title.toLowerCase().includes(searchValinput.toLowerCase()),
    )

    return (
      <Context.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <div>
              <div
                className={
                  isDarkTheme
                    ? 'trending-head-container-dark'
                    : 'trending-head-container-light'
                }
              >
                <SiYoutubegaming className="trending-icon" />
                <h1
                  className={
                    isDarkTheme
                      ? 'trending-heading-dark'
                      : 'trending-heading-light'
                  }
                >
                  Gaming
                </h1>
              </div>
              {searchedVideos.length === 0 ? (
                <div className="no-found-conatiner">
                  <img
                    alt="not"
                    className="nofoundImage"
                    src={
                      isDarkTheme
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                    }
                  />
                </div>
              ) : (
                <ul className="uList">
                  {searchedVideos.map(e => (
                    <GAMINGCARD videoObj={e} key={e.id} />
                  ))}
                </ul>
              )}
            </div>
          )
        }}
      </Context.Consumer>
    )
  }

  renderesult = async () => {
    const url = 'https://apis.ccbp.in/videos/gaming'
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU'
    const opt = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const response = await fetch(url, opt)
    const data = await response.json()
    if (response.status === 401) {
      this.setState({fetchStatus: FetchStatuses[2]}, this.renderVideos)
    } else {
      console.log(data.videos)

      const videoslist = data.videos
      const formattedData = videoslist.map(e => ({
        id: e.id,

        thumbnailUrl: e.thumbnail_url,
        title: e.title,
        viewCount: e.view_count,
      }))

      this.setState(
        {
          fetchStatus: FetchStatuses[1],
          videosList: formattedData,
        },
        this.renderVideos,
      )
    }
  }

  searchVideos = event => {
    this.setState({searchValinput: event.target.value}, this.renderVideos)
  }

  render() {
    console.log('Gaming')
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <Context.Consumer>
        {value => {
          const {isDarkTheme} = value

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
                  {this.renderVideos()}
                </div>
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default Gaming
