import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import * as Icon from 'react-feather'
import { RootContext } from '../context/rootContext';
// import axios from 'axios';

const Footer = () => {
  let { store } = useContext(RootContext)

  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light border-top mt-4">
        <div className="container">
          <Link to="/" className="navbar-text mx-auto">(c) 2021 - {store.siteName}</Link>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Footer
