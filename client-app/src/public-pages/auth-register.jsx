import React, { useContext, useState } from "react";
import axios from "axios";
import PageHeader from "../partials/page-header";
import { RootContext } from "../context/rootContext";


const AuthRegister = () => {
  const { store } = useContext(RootContext)
  const [state, setState] = useState({
    username: '',
    email: '',
    fullname: '',
    password: ''
  })

  const changeData = e => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    })
  }

  const submitRegister = () => {
    let data = {
      ...state
    }
    axios.post(store.apiUrl + '/auth/register', data).then(res => {
      console.log(res.data)
    })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <React.Fragment>
      <PageHeader title="Register" btnLink="/login" btnText="Login" />
      <div className="card">
        <div className="col-md-6 offset-md-3 px-0">
          <div className="card-body">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" className="form-control" id="fullname" value={state['fullname']} onChange={changeData} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="text" className="form-control" id="email" value={state['email']} onChange={changeData} />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" id="username" value={state['username']} onChange={changeData} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" id="password" value={state['password']} onChange={changeData} />
            </div>
            <button onClick={submitRegister} className="btn btn-primary mt-2 mb-3">Register</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AuthRegister;