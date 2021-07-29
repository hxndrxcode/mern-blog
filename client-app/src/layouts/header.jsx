import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather'
import { RootContext } from '../context/rootContext';
// import axios from 'axios';

const Header = () => {
  let { store } = useContext(RootContext)

  return (
    <nav className="navbar fixed-top navbar-light bg-light border-bottom">
      <div className="container">
        <span className="mr-3 d-lg-none" type="button" data-toggle="collapse" data-target="#sidebar">
          <Icon.Menu />
        </span>
        <Link to="/" className="navbar-brand mr-auto">{store.siteName}</Link>
      </div>
    </nav>
  );
}

export default Header
