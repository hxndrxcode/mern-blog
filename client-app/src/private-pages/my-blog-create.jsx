import React, { useContext, useState } from "react";
import PageHeader from "../partials/page-header";
import { Redirect } from "react-router-dom";
import { RootContext } from "../context/rootContext";
import axios from "axios";

const MyBlogCreate = props => {
  const { store } = useContext(RootContext)
  const [state, setState] = useState({
    form: {
      scheme: 'http://',
      subdomain: '',
      domain: '',
      domain_type: 'subdomain',
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
              <label>Domain</label>
              <select value={state.form.domain_type} onChange={changes} id="domain_type" className="form-control mb-2">
                <option value="subdomain">Subdomain</option>
                <option value="domain">My own domain</option>
              </select>
              {state.form.domain_type === 'subdomain' ? (
                <div className="input-group mb-2">
                  <input type="text" id="subdomain" value={state.form.subdomain} onChange={changes}
                    placeholder="subdomain" className="form-control" />
                  <div className="input-group-append">
                    <span className="input-group-text">.blogwi.com</span>
                  </div>
                </div>
              ) : (
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <select value={state.form.scheme} className="form-control" onChange={changes}>
                      <option value="http://">http://</option>
                      <option value="https://">https://</option>
                    </select>
                  </div>
                  <input type="text" id="subdomain" value={state.form.subdomain} onChange={changes}
                    placeholder="www.yourdomain.com" className="form-control" />
                </div>
              )}
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