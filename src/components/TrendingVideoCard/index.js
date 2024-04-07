import {FaCircle} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import Context from '../../Context/index'
import './index.css'

const TrendingVideoCard = props => {
  const {videoObj} = props
  const {channel, id, thumbnailUrl, publishedAt, viewCount, title} = videoObj
  const {name} = channel

  return (
    <Link to={`/videos/${id}`} className="link">
      <Context.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <div className="tcard-container">
              <img className="timg" src={thumbnailUrl} />
              <div className="tvideo-details-container">
                <div>
                  <h1 className={isDarkTheme ? 'thead-dark' : 'thead-light'}>
                    {title}
                  </h1>
                  <p className={isDarkTheme ? 'tpara-dark' : 'tpara-light'}>
                    {name}
                  </p>

                  <div className="tvideos-count">
                    <p className={isDarkTheme ? 'tpara-dark' : 'tpara-light'}>
                      {viewCount} Views
                    </p>
                    <FaCircle className="tdot-icon" />
                    <p className={isDarkTheme ? 'tpara-dark' : 'tpara-light'}>
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

export default TrendingVideoCard
