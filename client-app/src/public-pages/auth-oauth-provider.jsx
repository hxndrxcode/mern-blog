import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { RootContext } from "../context/rootContext";
import { Api, handleApiError } from "../helper/Api";

const AuthOauthProvider = () => {
  const { store, dispatch } = useContext(RootContext)
  document.title = 'Loading' + store.docTitle

  const submitLogin = () => {
    Api.get('/auth/oauthgoogle/handler' + window.location.search)
      .then(res => {
        dispatch({
          type: 'set_token',
          data: res.data.token
        })
        dispatch({
          type: 'set_user',
          data: res.data.user
        })
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

  useEffect(() => {
      submitLogin()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (store.authuser) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <React.Fragment>

    </React.Fragment>
  );
}

export default AuthOauthProvider;