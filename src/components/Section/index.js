import {FaHome} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {IoTrendingUpOutline} from 'react-icons/io5'
import {SiYoutubegaming} from 'react-icons/si'
import {HiSave} from 'react-icons/hi'

import Context from '../../Context/index'

import './index.css'

const Section = props => {
  const {sectionObj} = props
  const {eid, displayText} = sectionObj

  return (
    <Context.Consumer>
      {value => {
        const {isdarkTheme, activeTab, updateActiveTab} = value
        const returnTabId = () => {
          updateActiveTab(eid)
        }
        const isActive = eid === activeTab
        return (
          <Link
            className="section-link"
            to={eid === 'HOME' ? '/' : `/${eid.toLowerCase()}`}
          >
            <li
              onClick={returnTabId}
              className="different-categories-container"
            >
              {eid === 'HOME' && (
                <FaHome className={isActive ? 'active-icon' : 'icon'} />
              )}
              {eid === 'TRENDING' && (
                <IoTrendingUpOutline
                  className={isActive ? 'active-icon' : 'icon'}
                />
              )}
              {eid === 'GAMING' && (
                <SiYoutubegaming
                  className={isActive ? 'active-icon' : 'icon'}
                />
              )}
              {eid === 'SAVEDVIDEOS' && (
                <HiSave className={isActive ? 'active-icon' : 'icon'} />
              )}

              <h1 className="head">{displayText}</h1>
            </li>
          </Link>
        )
      }}
    </Context.Consumer>
  )
}

export default Section
