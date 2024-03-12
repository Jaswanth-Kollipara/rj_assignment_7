import Header from '../Header'
import SideBar from '../SideBar'
import JobContext from '../../context/JobContext'

const NotFound = () => (
  <JobContext.Consumer>
    {value => {
      const {isDark} = value
      const bgDark = isDark ? 'dark' : 'light'
      const bgImg = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <div className={bgDark}>
          <Header />
          <div>
            <SideBar />
            <div>
              <img src={bgImg} alt="not found" />
              <h1>Page Not Found</h1>
              <p>We are sorry,the page you requested could not be found.</p>
            </div>
          </div>
        </div>
      )
    }}
  </JobContext.Consumer>
)

export default NotFound