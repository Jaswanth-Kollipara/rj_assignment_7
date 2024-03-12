import {HiFire} from 'react-icons/hi'
import JobContext from '../../context/JobContext'
import VideoItemSaved from '../VideoItemSaved'
import Header from '../Header'
import SideBar from '../SideBar'

const SavedVideos = () => (
  <JobContext.Consumer>
    {value => {
      const {isDark, savedList} = value
      const bgDark = isDark ? '#0f0f0f' : '#f9f9f9'
      const len = savedList.length > 0

      return (
        <div>
          <div>
            <Header />
            <div>
              <SideBar />
              {len ? (
                <div className={bgDark}>
                  <div>
                    <HiFire />
                    <h1>Saved Videos</h1>
                  </div>
                  <div>
                    <ul>
                      {savedList.map(item => (
                        <VideoItemSaved data={item} key={item.id} />
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className={bgDark}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                  />
                  <h1>No saved videos found</h1>
                  <p>You can save youor videos while watching them</p>
                  <p>Save your videos by clicking a button</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }}
  </JobContext.Consumer>
)

export default SavedVideos
