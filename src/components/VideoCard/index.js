import {FaCircle} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Context from '../../Context/index'
import './index.css'

const VideoCard = props => {
  const {videoObj} = props
  const {channel, id, thumbnailUrl, publishedAt, viewCount, title} = videoObj
  const newChannnelObj = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  }
  const {name, profileImageUrl} = newChannnelObj

  return (
    <Link to={`/videos/${id}`} className="link">
      <Context.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <div className="card-container">
              <img className="img" src={thumbnailUrl} />
              <div className="video-details-container">
                <img className="chanel-logo" src={profileImageUrl} />
                <div>
                  <h1 className={isDarkTheme ? 'head-dark' : 'head-light'}>
                    {title}
                  </h1>
                  <p className={isDarkTheme ? 'para-dark' : 'para-light'}>
                    {name}
                  </p>

                  <div className="videos-count">
                    <p className={isDarkTheme ? 'para-dark' : 'para-light'}>
                      {viewCount} Views
                    </p>
                    <FaCircle className="dot-icon" />
                    <p className={isDarkTheme ? 'para-dark' : 'para-light'}>
                      {publishedAt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    </Link>
  )
}

export default VideoCard
