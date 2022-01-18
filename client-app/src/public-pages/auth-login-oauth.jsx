import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { RootContext } from "../context/rootContext";
import PageHeader from "../partials/page-header";
import { Api, handleApiError } from "../helper/Api";
import * as Icon from 'react-feather'

const AuthLoginOauth = () => {
  const { store, dispatch } = useContext(RootContext)
  document.title = 'Login' + store.docTitle

  const loginUrl = () => {
    Api.get('auth/oauthgoogle')
      .then(res => {
        window.location.href = res.data.url
      })
      .catch(err => handleApiError(err, store, dispatch))
  }

  if (store.authuser) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <React.Fragment>
      <PageHeader title="Login" />
      <div className="card">
        <div className="card-body text-center py-4">
          <p>
            Login with your Google Account for secure and seamless experience
          </p>
          <button onClick={loginUrl} className="btn btn-info">
            <Icon.LogIn />
            Login with Google
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AuthLoginOauth;