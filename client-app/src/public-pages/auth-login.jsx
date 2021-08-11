import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { RootContext } from "../context/rootContext";
import PageHeader from "../partials/page-header";
import { handleApiError } from "../helper/Api";

const AuthLogin = () => {
  const { store, dispatch } = useContext(RootContext)
  document.title = 'Login' + store.docTitle

  const [state, setState] = useState({
    username: '',
    password: '',
    isLoading: true
  })

  const changeData = e => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    })
  }

  const submitLogin = () => {
    let data = {
      username: state.username,
      password: state.password,
    }
    axios.post(store.apiUrl + '/auth/login', data)
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

  if (store.authuser) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <React.Fragment>
      <PageHeader title="Login" btnLink="/register" btnText="Register" btnArrow="right" />
      <div className="card">
        <div className="col-md-6 offset-md-3 px-0">
          <div className="card-body">
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" id="username" value={state.username} onChange={changeData} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" id="password" value={state.password} onChange={changeData} />
            </div>
            <button onClick={submitLogin} className="btn btn-primary mt-2 mb-3">Login</button>
            <div className="form-group">
              <label>
                Forgot Password? &nbsp;
                <Link to="/forgot" className="">Reset Here</Link>
              </label>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AuthLogin;