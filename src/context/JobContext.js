import React from 'react'

const JobContext = React.createContext({
  savedList: [],
  onSave: () => {},
  isDark: false,
  onChangeDark: () => {},
  isLiked: [],
  isDisliked: [],
  updateLike: () => {},
  updateDisLike: () => {},
})

export default JobContext
