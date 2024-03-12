import {Component} from 'react'
import {IoMdClose} from 'react-icons/io'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import JobContext from '../../context/JobContext'
import VideoItemHome from '../VideoItemHome'
import Header from '../Header'
import SideBar from '../SideBar'
import {HomeDiv, Banner} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    videoList: [],
    apiStatus: apiStatusConstants.initial,
    searchText: '',
    isClick: true,
  }

  componentDidMount() {
    this.getVideos()
  }

  onClickRetry() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchText}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(product => ({
        id: product.id,
        title: product.title,
        thumbnailUrl: product.thumbnail_url,
        name: product.channel.name,
        profileImageUrl: product.channel.profile_image_url,
        viewCount: product.view_count,
        publishedAt: product.published_at,
      }))
      this.setState({
        videoList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickSearch = () => {
    this.getVideos()
  }

  onClickClose = () => {
    this.setState(prevState => ({isClick: !prevState.isClick}))
  }

  onChangeText = event => {
    this.setState({searchText: event.target.value})
  }

  renderVideoList = () => {
    const {videoList} = this.state
    const len = videoList.length > 0

    return len ? (
      <>
        <ul>
          {videoList.map(item => (
            <VideoItemHome data={item} key={item.id} />
          ))}
        </ul>
      </>
    ) : (
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
        />
        <h1>No Search results found</h1>
        <p>Try different key words or remove search filter</p>
        <button type="button" onClick={this.onClickRetry}>
          Retry
        </button>
      </>
    )
  }

  renderFailureView = () => (
    <JobContext.Consumer>
      {value => {
        const {isDark} = value
        const srcImg = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <>
            <img src={srcImg} alt="failure view" />
            <h1>Oops! Something Went Wrong</h1>
            <p>
              We are having some trouble to complete your request. Please try
              again
            </p>
            <button type="button" onClick={this.onClickRetry}>
              Retry
            </button>
          </>
        )
      }}
    </JobContext.Consumer>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderListView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {isClick, searchText} = this.state
    const close = <IoMdClose />
    const search = <FaSearch />

    return (
      <JobContext.Consumer>
        {value => {
          const {isDark} = value
          const bgDark = isDark ? '#0f0f0f' : '#f9f9f9'
          const logo = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

          return (
            <div>
              <Header />
              <div>
                <SideBar />
                <HomeDiv color={bgDark} data-testid="home">
                  {isClick && (
                    <Banner data-testid="banner">
                      <div>
                        <img src={logo} alt="nxt watch logo" />
                        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                        <button type="button">GET IT NOW</button>
                      </div>
                      <div>
                        <button
                          type="button"
                          data-testid="close"
                          onClick={this.onClickClose}
                        >
                          {close}
                        </button>
                      </div>
                    </Banner>
                  )}
                  <div>
                    <input
                      type="search"
                      value={searchText}
                      onChange={this.onChangeText}
                    />
                    <button
                      type="button"
                      data-testid="searchButton"
                      onClick={this.onClickSearch}
                    >
                      {search}
                    </button>
                  </div>
                  <div>{this.renderListView()}</div>
                </HomeDiv>
              </div>
            </div>
          )
        }}
      </JobContext.Consumer>
    )
  }
}

export default Home
