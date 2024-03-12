import {Link} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {FcAcceptDatabase} from 'react-icons/fc'
import JobContext from '../../context/JobContext'

const SideBar = () => (
  <JobContext.Consumer>
    {value => {
      const {isDark} = value
      const bgDark = isDark ? 'dark' : 'light'

      return (
        <div className={bgDark}>
          <ul>
            <Link to="/">
              <li>
                <IoMdHome />
                <p>Home</p>
              </li>
            </Link>
            <Link to="/trending">
              <li>
                <HiFire />
                <p>Trending</p>
              </li>
            </Link>
            <Link to="/gaming">
              <li>
                <SiYoutubegaming />
                <p>Gaming</p>
              </li>
            </Link>
            <Link to="/saved-videos">
              <li>
                <FcAcceptDatabase />
                <p>Saved videos</p>
              </li>
            </Link>
          </ul>
          <div>
            <p>CONTACT US</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
              alt="facebook logo"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
              alt="twitter logo"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
              alt="linked in logo"
            />
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </div>
      )
    }}
  </JobContext.Consumer>
)

export default SideBar
