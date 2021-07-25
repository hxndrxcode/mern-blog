import React, { useContext, useState } from "react";
import PageHeader from "../partial/PageHeader";
import { Redirect } from "react-router-dom";
import { RootContext } from "../../context/rootContext";
import axios from "axios";

const CreateBlog = props => {
  const { store } = useContext(RootContext)
  const [state, setState] = useState({
    form: {
      domain: '',
      domain_type: 'subdomain',
      is_https: true,
      title: ''
    },
    isComplete: false
  })

  const changes = e => {
    let form = state.form
    form[e.target.id] = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    if (e.target.id === 'domain_type' && e.target.value === 'subdomain') {
      form.is_https = true
    }
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
                <option value="subdomain">blogwi.com subdomain</option>
                <option value="domain">My own domain</option>
              </select>
              <div className="input-group mb-2">
                <input type="text" id="domain" value={state.form.domain} onChange={changes}
                  placeholder={state.form.domain_type === 'subdomain' ? 'myblogname' : 'www.blogname.com'}
                  className="form-control" />
                {state.form.domain_type === 'subdomain' && <div className="input-group-append">
                  <span className="input-group-text">.blogwi.com</span>
                </div>}
              </div>
              <label htmlFor="is_https">
                <input type="checkbox" checked={state.form.is_https} onChange={changes} id="is_https" className="mr-2" disabled={state.form.domain_type === 'subdomain'} />
                Support https
              </label>
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

export default CreateBlog