import {Link} from 'react-router-dom'
import JobContext from '../../context/JobContext'

const VideoItemGaming = props => {
  const {data} = props
  const {id, title, thumbnailUrl, viewCount} = data

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
                <p>{title}</p>
                <p>{viewCount}</p>
              </div>
            </li>
          </Link>
        )
      }}
    </JobContext.Consumer>
  )
}

export default VideoItemGaming
