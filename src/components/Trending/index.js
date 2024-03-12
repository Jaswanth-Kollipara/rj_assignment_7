import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiFire} from 'react-icons/hi'
import JobContext from '../../context/JobContext'
import VideoItemTrending from '../VideoItemTrending'
import Header from '../Header'
import SideBar from '../SideBar'
import {TrendingDiv} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    videoList: [],
    apiStatus: apiStatusConstants.initial,
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
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
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

  renderVideoList = () => {
    const {videoList} = this.state

    return (
      <div>
        <ul>
          {videoList.map(item => (
            <VideoItemTrending data={item} key={item.id} />
          ))}
        </ul>
      </div>
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
    return (
      <JobContext.Consumer>
        {value => {
          const {isDark} = value
          const bgDark = isDark ? '#0f0f0f' : '#f9f9f9'

          return (
            <div>
              <Header />
              <div>
                <SideBar />
                <TrendingDiv color={bgDark} data-testid="home">
                  <div>
                    <HiFire />
                    <h1>Trending</h1>
                  </div>
                  <div>{this.renderListView()}</div>
                </TrendingDiv>
              </div>
            </div>
          )
        }}
      </JobContext.Consumer>
    )
  }
}

export default Trending
