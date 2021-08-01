import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { RootContext } from "../context/rootContext";

const MyAccountMenu = props => {
  const { dispatch } = useContext(RootContext)
  const linkList = [
    { path: 'edit', text: 'Edit Profile' },
    { path: 'security', text: 'Account Security' }
  ]
  let activeIndex = linkList.findIndex(v => v.path === props.path)
  const onLogout = e => {
      dispatch('set_logout')
  }

  return (
    <React.Fragment>
      <div className="dropdown float-right">
        <span className="btn-link dropdown-toggle" style={{ fontSize: 'initial' }} data-toggle="dropdown">
          {activeIndex >= 0 ? linkList[activeIndex].text : ''}&nbsp;
        </span>
        <div className="dropdown-menu dropdown-menu-right">
          {linkList.map(v => {
            return (
              <Link to={`/my-account/${v.path}`}
                className={'dropdown-item ' + ((v.path === props.path) && 'bg-info text-white')}
                key={v.path}>
                {v.text}
              </Link>
            )
          })}
          <div className="dropdown-divider"></div>
          <span onClick={onLogout} className="dropdown-item text-danger btn-link">
            &times; Log out
          </span>
        </div>
      </div>
    </React.Fragment>
  )
}

export default MyAccountMenu