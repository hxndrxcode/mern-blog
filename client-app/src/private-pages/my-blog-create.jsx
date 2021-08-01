import React, { useContext, useState } from "react";
import PageHeader from "../partials/page-header";
import { Redirect } from "react-router-dom";
import { RootContext } from "../context/rootContext";
import axios from "axios";

const MyBlogCreate = props => {
  const { store } = useContext(RootContext)
  const [state, setState] = useState({
    form: {
      subdomain: '',
      title: ''
    },
    isComplete: false
  })

  const changes = e => {
    let form = state.form
    form[e.target.id] = e.target.value
    setState({
      ...state,
      form
    })
  }

  const submitForm = e => {
    e.preventDefault()
    axios.post(store.apiUrl + '/myblog', state.form, store.authHeader)
      .then(res => {
        setState({
          ...state,
          isComplete: true
        })
      })
      .catch(err => {

      })
  }

  return state.isComplete ? (
    <Redirect to="/my-blog" />
  ) : (
    <React.Fragment>
      <PageHeader title="Create Blog" btnLink="/my-blog" btnText="My Blog" />
      <div className="card">
        <div className="card-body">
          <form onSubmit={submitForm} className="col-md-6 offset-md-3 px-0">
            <div className="form-group">
              <label>Subdomain</label>
              <div className="input-group">
                <input type="text" id="subdomain" value={state.form.subdomain} onChange={changes}
                  placeholder="" className="form-control" />
                <div className="input-group-append">
                  <span className="input-group-text">.blogwi.com</span>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Blog Title</label>
              <input type="text" id="title" value={state.form.title} onChange={changes} className="form-control" />
            </div>
            <button className="btn btn-info">Submit</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default MyBlogCreate