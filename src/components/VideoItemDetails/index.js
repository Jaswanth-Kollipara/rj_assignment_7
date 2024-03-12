import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {FcAcceptDatabase} from 'react-icons/fc'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideBar from '../SideBar'
import {ItemDiv, ButtonItem} from './styledComponents'
import JobContext from '../../context/JobContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoList: {},
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
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.video_details.id,
        title: fetchedData.video_details.title,
        videoUrl: fetchedData.video_details.video_url,
        name: fetchedData.video_details.name,
        profileImageUrl: fetchedData.video_details.profile_image_url,
        subscriberCount: fetchedData.video_details.subscriber_count,
        viewCount: fetchedData.video_details.view_count,
        publishedAt: fetchedData.video_details.published_at,
        description: fetchedData.video_details.description,
      }
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
    const {
      id,
      title,
      videoUrl,
      name,
      profileImageUrl,
      subscriberCount,
      viewCount,
      publishedAt,
      description,
    } = videoList
    let postedAt = formatDistanceToNow(new Date(publishedAt))
    const postedAtList = postedAt.split(' ')
    if (postedAtList.length === 3) {
      postedAtList.shift()
      postedAt = postedAtList.join(' ')
    }

    return (
      <JobContext.Consumer>
        {value => {
          const {
            savedList,
            onSave,
            isDark,
            isLiked,
            isDisliked,
            updateLike,
            updateDisLike,
          } = value
          const liked = isLiked.find(item => item === id)
          const disliked = isDisliked.find(item => item === id)
          const saved = savedList.find(item => item.id === id)
          const onClickSave = () => {
            onSave(videoList)
          }
          const onClickLike = () => {
            updateLike(id)
          }
          const onClickDisLike = () => {
            updateDisLike(id)
          }
          const bgDark = isDark ? 'dark' : 'light'
          const color1 = liked === undefined ? '#64748b' : '#2563eb'
          const color2 = disliked === undefined ? '#64748b' : '#2563eb'
          const color3 = saved === undefined ? '#64748b' : '#2563eb'
          const text = saved === undefined ? 'Save' : 'Saved'

          return (
            <div className={bgDark}>
              <ReactPlayer url={videoUrl} />
              <p>{title}</p>
              <div>
                <div>
                  <p>{viewCount} views</p>
                  <p>{postedAt}</p>
                </div>
                <div>
                  <ButtonItem color={color1} onClick={onClickLike}>
                    <AiOutlineLike /> Like
                  </ButtonItem>
                  <ButtonItem color={color2} onClick={onClickDisLike}>
                    <AiOutlineDislike /> Disliked
                  </ButtonItem>
                  <ButtonItem color={color3} onClick={onClickSave}>
                    <FcAcceptDatabase /> {text}
                  </ButtonItem>
                </div>
              </div>
              <hr />
              <div>
                <img src={profileImageUrl} alt={name} />
                <div>
                  <h1>{name}</h1>
                  <p>{subscriberCount} subscribers</p>
                  <p>{description}</p>
                </div>
              </div>
            </div>
          )
        }}
      </JobContext.Consumer>
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
              again.
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
                <ItemDiv color={bgDark} data-testid="videoItemDetails">
                  {this.renderListView()}
                </ItemDiv>
              </div>
            </div>
          )
        }}
      </JobContext.Consumer>
    )
  }
}

export default VideoItemDetails
