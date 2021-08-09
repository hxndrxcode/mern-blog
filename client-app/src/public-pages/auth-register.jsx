import React, { useContext, useState } from "react";
import PageHeader from "../partials/page-header";
import { RootContext } from "../context/rootContext";
import { Api, handleApiError } from "../helper/Api";

const AuthRegister = () => {
  const { store, dispatch } = useContext(RootContext)
  document.title = 'Register' + store.docTitle

  const [state, setState] = useState({
    form: {
      username: '',
      email: '',
      fullname: '',
      password: ''
    },
    isDone: false
  })

  const changeData = e => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    })
  }

  const submitRegister = e => {
    e.preventDefault()
    let data = {
      ...state
    }
    Api.post('auth/register', data)
      .then(res => {
        dispatch({
          type: 'set_notif',
          data: 'Registration success. Please check activation link in your email.'
        })
      })
      .catch(err => handleApiError(err, store, dispatch))
  }

  return (
    <React.Fragment>
      <PageHeader title="Register" btnLink="/login" btnText="Login" />
      <div className="card">
        <div className="col-md-6 offset-md-3 px-0">
          <form onSubmit={submitRegister} className="card-body">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" className="form-control" id="fullname" value={state.form.fullname} onChange={changeData} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="text" className="form-control" id="email" value={state.form.email} onChange={changeData} />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" id="username" value={state.form.username} onChange={changeData} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" id="password" value={state.form.password} onChange={changeData} />
            </div>
            <button className="btn btn-primary mt-2 mb-3">Register</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AuthRegister;