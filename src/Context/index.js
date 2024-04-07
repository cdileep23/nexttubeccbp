import React from 'react'

const Context = React.createContext({
  isDarkTheme: false,
  activeTab: 'HOME',
  updateActiveTab: () => {},
  setHomeTab: () => {},
  LogoutUser: () => {},
  updateSavedVideos: () => {},

  SavedVideosList: [],
  removeVideo: () => {},
  LikedVideosList: [],
  DisLikedVideoList: [],
  addTolikedVideo: () => {},
  addToDislikedVideo: () => {},
  removeFromLikedVideo: () => {},
  removeFromDisLikedVideo: () => {},
})

export default Context
