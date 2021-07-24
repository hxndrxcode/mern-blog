import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Redirect, useParams } from "react-router-dom"
import { RootContext } from "../../context/rootContext"
import PageHeader from "../partial/PageHeader"

const CreatePost = props => {
  const { store } = useContext(RootContext)
  document.title = 'Create Post' + store.docTitle
  const { blogId } = useParams()
  const [state, setState] = useState({
    blogId,
    form: {
      blog_id: blogId,
      title: '',
      permalink: '',
      body: ''
    },
    isDone: false
  })

  const changes = e => {
    setState({
      ...state,
      form: {
        ...state.form,
        [e.target.id]: e.target.value
      }
    })
  }

  const submitCreate = e => {
    e.preventDefault()
    axios.post(store.apiUrl + '/mypost', state.form, store.authHeader)
      .then(({ data }) => {
        setState({
          ...state,
          isDone: true
        })
      })
  }

  useEffect(() => {
    // setTimeout(fetchPost, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state.isDone ? <Redirect to={props.match.url.replace('/create', '')} /> : (
    <React.Fragment>
      <PageHeader title="Create Post" btnLink={`/my-blog/${blogId}/post`} btnText="Post" />
      <div className="card">
        <form onSubmit={submitCreate} className="card-body">
        <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" value={state.form.title} onChange={changes} />
          </div>
          <div className="form-group">
            <label htmlFor="permalink">Permalink</label>
            <input type="text" className="form-control" id="permalink" value={state.form.permalink} onChange={changes} />
          </div>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea className="form-control" id="body" value={state.form.body} onChange={changes} rows="10"></textarea>
          </div>
          <button className="btn btn-info">Submit</button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default CreatePost