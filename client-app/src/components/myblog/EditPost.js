import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Link, Redirect, useParams } from "react-router-dom"
import { RootContext } from "../../context/rootContext"
import { handleApiError } from "../../helper/Api"
import PageHeader from "../partial/PageHeader"

const EditPost = props => {
  const { store, dispatch } = useContext(RootContext)
  document.title = 'Edit Post' + store.docTitle
  const { blogId, postId } = useParams()
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

  const submitEdit = e => {
    e.preventDefault()
    axios.put(`${store.apiUrl}/mypost/${postId}`, state.form, store.authHeader)
      .then(({ data }) => {
        setState({
          ...state,
          isDone: true
        })
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

  const fetchPostDetail = () => {
    axios.get(`${store.apiUrl}/mypost/${postId}?blog_id=${blogId}`, store.authHeader)
    .then(({ data }) => {
      setState({
        ...state,
        form: data.data
      })
    })
  }
  useEffect(() => {
    setTimeout(fetchPostDetail, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state.isDone ? <Redirect to={props.match.url.replace(`/${postId}/edit`, '')} /> : (
    <React.Fragment>
      <PageHeader title="Edit Post" btnLink={`/my-blog/${blogId}/post`} btnText="Post" />
      <div className="card">
        <form onSubmit={submitEdit} className="card-body">
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
          <button className="btn btn-info">Update</button>
          <Link to={`/my-blog/${blogId}/post`} className="btn btn-link ml-2">Cancel</Link>
        </form>
      </div>
    </React.Fragment>
  )
}

export default EditPost