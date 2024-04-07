import Cookies from 'js-cookie'
import {Component} from 'react'
import {FaCircle} from 'react-icons/fa'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import ReactPlayer from 'react-player'
import {Redirect} from 'react-router-dom'
import {ThreeDots} from 'react-loader-spinner'
import Context from '../../Context/index'
import Header from '../Header/index'
import './index.css'
import SideBar from '../Sidebar/index'

const FetchStatuses = ['EXECUTING', 'SUCCESSFUL', 'FAILURE']

class EachVideoComponent extends Component {
  state = {
    videosDetails: {},
    fetchStatus: FetchStatuses[0],
  }

  componentDidMount = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.renderResult(id)
  }

  removeSubscription = () => {
    this.setState({showSubscription: false})
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <ThreeDots type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderVideos = () => {
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

  renderFailureView = () => (
    <Context.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <div className="no-found-conatiner">
            <img
              alt="newImage"
              className="nofoundImage"
              src={
                isDarkTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
              }
            />
          </div>
        )
      }}
    </Context.Consumer>
  )

  renderVideosContent = () => {
    const {videosDetails} = this.state

    return (
      <Context.Consumer>
        {value => {
          const {
            isDarkTheme,
            updateSavedVideos,
            SavedVideosList,
            removeVideo,
            DisLikedVideoList,
            LikedVideosList,
            removeFromDisLikedVideo,
            removeFromLikedVideo,
            addToDislikedVideo,
            addTolikedVideo,
          } = value

          const isSaved = SavedVideosList.some(e => e.id === videosDetails.id)
          const isLiked = LikedVideosList.some(e => e.id === videosDetails.id)
          const isDisLiked = DisLikedVideoList.some(
            e => e.id === videosDetails.id,
          )

          const darkThemeClass = isDarkTheme ? 'head-dark' : 'head-light'
          const savedClass = isLiked ? '-saved' : ''
          const iconClass = 'icons'

          return (
            <div className="video-player-main-cont">
              <ReactPlayer
                width="100%"
                height="500px"
                url={videosDetails.videoUrl}
              />
              <h1 className={darkThemeClass}>{videosDetails.title}</h1>

              <div className="video-details-container">
                <div className="video-likes-dislikes">
                  <p className={isDarkTheme ? 'p-dark' : 'p-light'}>
                    {videosDetails.viewCount}
                  </p>
                  <FaCircle
                    className={isDarkTheme ? 'dot-dark' : 'dot-light'}
                  />
                  <p className={isDarkTheme ? 'p-dark' : 'p-light'}>
                    {videosDetails.publishedAt}
                  </p>
                </div>

                <div className="whole-container">
                  <div className="like-container">
                    <button
                      onClick={isLiked ? removeFromLikedVideo : addTolikedVideo}
                      className="save-button"
                      alt="BiLike"
                    >
                      <BiLike
                        className={`${darkThemeClass}${savedClass} ${iconClass}`}
                      />
                    </button>
                    <p className={isDarkTheme ? 'p-dark' : 'p-light'}>
                      {isLiked ? (
                        <p className="text-active-one">Liked</p>
                      ) : (
                        <p>Like</p>
                      )}
                    </p>
                  </div>
                  <div className="like-container">
                    <button
                      onClick={
                        isDisLiked
                          ? removeFromDisLikedVideo
                          : addToDislikedVideo
                      }
                      className="save-button"
                      alt="BisDislike"
                    >
                      <BiDislike
                        className={`${darkThemeClass}${savedClass} ${iconClass}`}
                      />
                    </button>
                    <p className={isDarkTheme ? 'p-dark' : 'p-light'}>
                      {isDisLiked ? (
                        <p className="text-active-one">DisLiked</p>
                      ) : (
                        <p>DisLike</p>
                      )}
                    </p>
                  </div>
                  <div className="like-container">
                    <button
                      onClick={isSaved ? removeVideo : updateSavedVideos}
                      alt="saveButton"
                      className="save-button"
                    >
                      <MdPlaylistAdd
                        className={`${darkThemeClass}${savedClass} ${iconClass}`}
                      />
                    </button>
                    <p className={isDarkTheme ? 'p-dark' : 'p-light'}>
                      {isSaved ? (
                        <p className="text-active-one">Saved</p>
                      ) : (
                        <p>Save</p>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="channel-details">
                <img
                  className="channel-logo"
                  src={videosDetails.channel.profile_image_url}
                  alt="channel logo"
                />
                <div>
                  <h1 className={darkThemeClass}>
                    {videosDetails.channel.name}
                  </h1>
                  <p className={isDarkTheme ? 'p-dark' : 'p-light'}>
                    {videosDetails.channel.subscriber_count}
                  </p>
                  <p className={darkThemeClass}>{videosDetails.description}</p>
                </div>
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }

  renderResult = async id => {
    const url = `https://apis.ccbp.in/videos/${id}`
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU'
    const opt = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }

    try {
      const response = await fetch(url, opt)
      const data = await response.json()

      if (response.status === 401) {
        this.setState({fetchStatus: FetchStatuses[2]})
      } else {
        console.log('complete video')
        const fvideoDetails = data.video_details

        const finalVideoDetails = {
          id: fvideoDetails.id,
          channel: fvideoDetails.channel,
          description: fvideoDetails.description,
          publishedAt: fvideoDetails.published_at,
          thumbnailUrl: fvideoDetails.thumbnail_url,
          title: fvideoDetails.title,
          videoUrl: fvideoDetails.video_url,
          viewCount: fvideoDetails.view_count,
        }

        this.setState({
          videosDetails: finalVideoDetails,
          fetchStatus: FetchStatuses[1],
        })
      }
    } catch (error) {
      console.error('Error fetching video:', error)
      this.setState({fetchStatus: FetchStatuses[2]})
    }
  }

  render() {
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

export default EachVideoComponent
