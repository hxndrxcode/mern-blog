import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import * as Icon from 'react-feather'
import { RootContext } from '../../context/rootContext';

const Sidebar = () => {
  let { store } = useContext(RootContext)

  return (
    <div className="position-fixed" style={{zIndex: 2}}>
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
                <Icon.Compass className="mr-3" />
                Explore Blogs
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
              <a href="http://localhost:3000" className="nav-link">
                <Icon.ArrowLeft className="mr-3" />
                Back to blogwf.com
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );

}

export default Sidebar
