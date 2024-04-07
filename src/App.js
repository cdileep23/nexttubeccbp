import {Route, Switch} from 'react-router-dom'
import {Component} from 'react'
import LoginForm from './components/Login/index'
import Trending from './components/Trending/index'
import Home from './components/Home/index'
import Gaming from './components/Gaming/index'
import SavedVideos from './components/SavedVideos/index'
import eachVideoComponent from './components/eachVideoComponent/index'
import './App.css'

import ReactContext from './Context/index'

class App extends Component {
  state = {
    isDarkTheme: false,
    activeTab: 'HOME',
    SavedVideosList: [],
    LikedVidesosList: [],
    DisLikedVideoList: [],
  }

  removeFromDisLikedVideo = obj => {
    const {DisLikedVideoList} = this.state
    const NewList = DisLikedVideoList.filter(e => e.id !== obj.id)
    this.setState({DisLikedVideoList: NewList})
  }

  addToDislikedVideo = obj => {
    const {DisLikedVideoList} = this.state
    const ispresent = DisLikedVideoList.some(e => e.id === obj.id)
    if (ispresent) {
      this.removeFromDisLikedVideo(obj)
    } else {
      this.setState(e => ({DisLikedVideoList: [...e.DisLikedVideoList, obj]}))
    }
  }

  removeFromLikedVideo = obj => {
    const {LikedVidesosList} = this.state
    const NewList = LikedVidesosList.filter(e => e.id !== obj.id)
    this.setState({LikedVidesosList: NewList})
  }

  addTolikedVideo = obj => {
    const {LikedVidesosList} = this.state
    const ispresent = LikedVidesosList.some(e => e.id === obj.id)
    if (ispresent) {
      this.removeFromLikedVideo(obj)
    } else {
      this.setState(e => ({LikedVidesosList: [...e.LikedVidesosList, obj]}))
    }
  }

  setHomeTab = () => {
    this.setState({activeTab: 'HOME'})
  }

  removeVideo = obj => {
    const {SavedVideosList} = this.state

    const NewList = SavedVideosList.filter(e => e.id !== obj.id)

    this.setState({SavedVideosList: NewList})
  }

  updateActiveTab = str => {
    console.log(str)
    this.setState({activeTab: str})
  }

  changeTheme = () => {
    this.setState(e => ({isDarkTheme: !e.isDarkTheme}))
  }

  updateSavedVideos = obj => {
    const {SavedVideosList} = this.state

    const ispresent = SavedVideosList.some(e => e.id === obj.id)
    if (ispresent) {
      console.log('alreadyPesent')
    } else {
      this.setState(e => ({SavedVideosList: [...e.SavedVideosList, obj]}))
    }
  }

  render() {
    const {
      isDarkTheme,
      activeTab,
      SavedVideosList,
      DisLikedVideoList,
      LikedVidesosList,
    } = this.state
    return (
      <ReactContext.Provider
        value={{
          DisLikedVideoList,
          LikedVidesosList,
          addTolikedVideo: this.addTolikedVideo,
          addToDislikedVideo: this.addToDislikedVideo,
          removeFromLikedVideo: this.removeFromLikedVideo,
          removeFromDisLikedVideo: this.removeFromDisLikedVideo,
          removeVideo: this.removeVideo,
          isDarkTheme,
          setHomeTab: this.setHomeTab,
          changetheme: this.changeTheme,
          activeTab,
          updateActiveTab: this.updateActiveTab,
          updateSavedVideos: this.updateSavedVideos,
          SavedVideosList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/" component={Home} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/gaming" component={Gaming} />
          <Route exact path="/savedvideos" component={SavedVideos} />
          <Route exact path="/videos/:id" component={eachVideoComponent} />
        </Switch>
      </ReactContext.Provider>
    )
  }
}

export default App
