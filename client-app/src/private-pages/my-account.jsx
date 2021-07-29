import React, { useContext, useEffect } from "react";
import { RootContext } from "../context/rootContext";
import PageHeader from "../partials/page-header";
import { useState } from "react";
import axios from "axios";
import { handleApiError } from "../helper/Api";
import { Redirect } from "react-router-dom";

const MyAccount = () => {
  const { store, dispatch } = useContext(RootContext)
  const [state, setState] = useState({
    form: {
      fullname: '',
      photo: '',
      bio: ''
    },
    isDone: false
  })

  const fetchProfile = () => {
    axios.get(store.apiUrl + '/profile', store.authHeader)
      .then(res => {
        const { fullname, photo, bio } = res.data.data
        setState({
          ...state,
          form: {
            fullname,
            photo,
            bio
          }
        })
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

  const changes = e => {
    setState({
      ...state,
      form: {
        ...state.form,
        [e.target.id]: e.target.value
      }
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    axios.put(store.apiUrl + '/profile', state.form, store.authHeader)
      .then(res => {
        setState({
          ...state,
          isDone: true
        })
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

  useEffect(() => {
    document.title = 'Edit Profile' + store.docTitle
    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state.isDone ? <Redirect to="/" /> : (
    <React.Fragment>
      <PageHeader title="Edit Profile" btnLogout={true} />
      <div className="card">
        <div className="card-body">
          <form onSubmit={onSubmit} className="col-md-6 offset-md-3 px-0">
            <div className="form-group">
              <label htmlFor="fullname">Fullname</label>
              <input type="text" id="fullname" onChange={changes} value={state.form.fullname} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="photo">Photo Profile</label>
              <input type="text" id="photo" onChange={changes} value={state.form.photo} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea id="bio" onChange={changes} value={state.form.bio} className="form-control" rows="5"></textarea>
            </div>
            <button className="btn btn-info">Update</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
export default MyAccount;