import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import JobContext from '../../context/JobContext'

const VideoItemTrending = props => {
  const {data} = props
  const {
    id,
    title,
    thumbnailUrl,
    profileImageUrl,
    name,
    viewCount,
    publishedAt,
  } = data
  let postedAt = formatDistanceToNow(new Date(publishedAt))
  const postedAtList = postedAt.split(' ')
  if (postedAtList.length === 3) {
    postedAtList.shift()
    postedAt = postedAtList.join(' ')
  }

  return (
    <JobContext.Consumer>
      {value => {
        const {isDark} = value
        const bgColor = isDark ? 'dark' : 'light'

        return (
          <Link to={`/videos/${id}`}>
            <li className={bgColor}>
              <img src={thumbnailUrl} alt="video thumbnail" />
              <div>
                <img src={profileImageUrl} alt="channel logo" />
                <div>
                  <p>{title}</p>
                  <p>{name}</p>
                  <div>
                    <p>{viewCount} views</p>
                    <p>{postedAt}</p>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </JobContext.Consumer>
  )
}

export default VideoItemTrending
