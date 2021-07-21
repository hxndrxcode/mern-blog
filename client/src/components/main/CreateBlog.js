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
    axios.post('http://localhost:3000/api/my/blog', state.form, store.authHeader)
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
      <PageHeader title="Create Blog" btnLink="/my-blog" btnText="My Blog" btnArrow="left" />
      <div className="card">
        <div className="card-body">
          <form onSubmit={submitForm} className="col-md-6 offset-md-3 px-0">
            <div className="form-group">
              <label>Domain</label>
              <input type="text" id="domain" value={state.form.domain} onChange={changes} className="form-control" />
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