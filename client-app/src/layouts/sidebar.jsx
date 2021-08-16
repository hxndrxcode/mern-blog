import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import * as Icon from 'react-feather'
import { RootContext } from '../context/rootContext';

const Sidebar = () => {
  const { store } = useContext(RootContext)

  return (
    <React.Fragment>
      <div data-toggle="collapse" data-target="#sidebar" className="sidebar-wrapper">
        <div className="collapse navbar-collapse mb-4" id="sidebar">
          <nav className="navbar navbar-light bg-light border">
            <ul className="navbar-nav w-100">
              <li className="nav-item">
                <NavLink to="/" exact={true} className="nav-link">
                  <Icon.Rss className="mr-3" />
                  Feed
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/trending" exact={true} className="nav-link">
                  <Icon.TrendingUp className="mr-3" />
                  Trending
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/blogs" exact={true} className="nav-link">
                  <Icon.Folder className="mr-3" />
                  Explore Blogs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/authors" exact={true} className="nav-link">
                  <Icon.UserCheck className="mr-3" />
                  Authors
                </NavLink>
              </li>
              <div className="dropdown-divider"></div>
              {store.authuser &&
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink to="/my-blog" exact={true} className="nav-link">
                      <Icon.Edit3 className="mr-3" />
                      My Blog
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/my-account" exact={true} className="nav-link">
                      <Icon.User className="mr-3" />
                      My Account
                    </NavLink>
                  </li>
                </React.Fragment>
              }
              {!store.authuser &&
                <li className="nav-item">
                  <NavLink to="/login" exact={true} className="nav-link">
                    <Icon.LogIn className="mr-3" />
                    Login/Signup
                  </NavLink>
                </li>
              }
              <div className="dropdown-divider"></div>
              <li className="nav-item">
                <a href={store.lpUrl} className="nav-link">
                  <Icon.ArrowLeft className="mr-3" />
                  Go to {store.lpSiteName}
                </a>
              </li>
              <div className="dropdown-divider d-lg-none"></div>
            <span className="mx-auto d-lg-none btn border bg-white btn-sm">
              <Icon.ArrowUp /> Close
            </span>
            </ul>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Sidebar
