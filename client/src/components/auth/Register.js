import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const Page = () => {
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
    axios.post('http://localhost:3000/api/auth/register', data).then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  return (
  <div className="card">
    <div className="col-md-6 offset-md-3">
      <div className="card-body">
      <div className="form-group">
          <label>Full Name</label>
          <input type="text" className="form-control" id="fullname" value={state['fullname']} onChange={changeData}/>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" id="email" value={state['email']} onChange={changeData}/>
        </div>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" id="username" value={state['username']} onChange={changeData}/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" id="password" value={state['password']} onChange={changeData} />
        </div>
        <button onClick={submitRegister} className="btn btn-primary mt-2 mb-3">Register</button>
        <div className="form-group">
          <label>
            Already have an account? &nbsp;
            <Link to="/login" className="">Login</Link>
          </label>
        </div>
      </div>
    </div>
  </div>
);
  }

export default Page;