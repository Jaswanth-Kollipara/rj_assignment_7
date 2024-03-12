import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import JobContext from './context/JobContext'
import Login from './components/Login'
import Games from './components/Games'
import NotFound from './components/NotFound'
import Home from './components/Home'
import VideoItemDetails from './components/VideoItemDetails'
import Trending from './components/Trending'
import ProtectedRoute from './components/ProtectedRoute'
import SavedVideos from './components/SavedVideos'
import './App.css'

class App extends Component {
  state = {
    savedList: [],
    isDark: false,
    isLiked: [],
    isDisliked: [],
  }

  onSave = data => {
    const {savedList} = this.state
    const isSaved = savedList.find(item => item.id === data.id)
    if (isSaved === undefined) {
      this.setState({savedList: [...savedList, data]})
    } else {
      const updateList = savedList.filter(item => item.id !== data.id)
      this.setState({savedList: updateList})
    }
  }

  updateLike = id => {
    const {isLiked, isDisliked} = this.state
    const like = isLiked.find(item => item === id)
    const disLike = isDisliked.find(item => item === id)
    if (like === undefined && disLike !== undefined) {
      const disLike1 = isDisliked.filter(item => item !== id)
      this.setState({isLiked: [...isLiked, id], isDisliked: disLike1})
    } else if (like !== undefined) {
      const updateLike = isLiked.filter(item => item !== id)
      this.setState({isLiked: updateLike})
    } else {
      this.setState({isLiked: [...isLiked, id]})
    }
  }

  updateDisLike = id => {
    const {isLiked, isDisliked} = this.state
    const like = isLiked.find(item => item === id)
    const disLike = isDisliked.find(item => item === id)
    if (disLike === undefined && like !== undefined) {
      const disLike1 = isLiked.filter(item => item !== id)
      this.setState({isDisliked: [...isDisliked, id], isLiked: disLike1})
    } else if (disLike !== undefined) {
      const updateLike = isDisliked.filter(item => item !== id)
      this.setState({isDisliked: updateLike})
    } else {
      this.setState({isDisliked: [...isDisliked, id]})
    }
  }

  onChangeDark = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  render() {
    const {savedList, isDark, isLiked, isDisliked} = this.state
    const bgColor = isDark ? 'dark' : 'light'

    return (
      <div className={bgColor}>
        <JobContext.Provider
          value={{
            savedList,
            onSave: this.onSave,
            isDark,
            onChangeDark: this.onChangeDark,
            isLiked,
            isDisliked,
            updateLike: this.updateLike,
            updateDisLike: this.updateDisLike,
          }}
        >
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={Login} />
              <ProtectedRoute exact path="/" component={Home} />
              <ProtectedRoute exact path="/trending" component={Trending} />
              <ProtectedRoute exact path="/gaming" component={Games} />
              <ProtectedRoute
                exact
                path="/saved-videos"
                component={SavedVideos}
              />
              <ProtectedRoute
                exact
                path="/videos/:id"
                component={VideoItemDetails}
              />
              <Route path="/not-found" component={NotFound} />
              <Redirect to="not-found" />
            </Switch>
          </BrowserRouter>
        </JobContext.Provider>
      </div>
    )
  }
}

export default App
