import {Link, withRouter} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import JobContext from '../../context/JobContext'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <JobContext.Consumer>
      {value => {
        const {isDark, onChangeDark} = value
        const bgColor = isDark ? 'dark' : 'light'
        const logo = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        const themeLogo = isDark ? <FaMoon /> : <FiSun />

        const onClickTheme = () => {
          onChangeDark()
        }

        return (
          <nav className={`${bgColor} con`}>
            <div>
              <Link to="/">
                <img src={logo} alt="website logo" />
              </Link>
              <ul>
                <li>
                  <button
                    type="button"
                    onClick={onClickTheme}
                    data-testid="theme"
                  >
                    {themeLogo}
                  </button>
                </li>
                <li>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                  />
                </li>
                <li>
                  <Popup
                    modal
                    trigger={<button type="button">Logout</button>}
                    className="popup-content"
                  >
                    {close => (
                      <>
                        <div>
                          <p>Are you sure, you want to logout?</p>
                        </div>
                        <button type="button" onClick={() => close()}>
                          Cancel
                        </button>
                        <button type="button" onClick={onClickLogout}>
                          Confirm
                        </button>
                      </>
                    )}
                  </Popup>
                </li>
              </ul>
            </div>
          </nav>
        )
      }}
    </JobContext.Consumer>
  )
}
export default withRouter(Header)
