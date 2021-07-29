import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Link, Redirect, useParams } from "react-router-dom"
import { RootContext } from "../context/rootContext"
import { handleApiError } from "../helper/Api"
import PageHeader from "../partials/page-header"

const MyPostEdit
  = props => {
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
        <form onSubmit={submitEdit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" value={state.form.title} onChange={changes} />
          </div>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea className="form-control" id="body" value={state.form.body} onChange={changes} rows="10"></textarea>
          </div>
          <div className="">
            <button type="button" className="btn btn-light dropdown-toggle" data-toggle="collapse" data-target="#card-advanced">
              Advanced
            </button>
          </div>
          <div className="card collapse mt-2" id="card-advanced">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="permalink">Custom Permalink</label>
                    <input type="text" className="form-control" id="permalink" value={state.form.permalink} onChange={changes} placeholder="Leave empty for auto permalink" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="is_published">Status</label>
                    <select id="is_published" value={state.form.is_published} onChange={changes} className="form-control">
                      <option value="true">Publish</option>
                      <option value="false">Draft</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="publish_soon">Schedule</label>
                    <select id="publish_soon" value={state.form.publish_soon} onChange={changes} className="form-control">
                      <option value="true">No change</option>
                      <option value="false">Set schedule</option>
                    </select>
                    {state.form.publish_soon === false ? (<div className="input-group mt-2">
                      <input type="date" id="published_at_date" value={state.form.published_at_date} onChange={changes} className="form-control" />
                      <input type="time" id="published_at_time" value={state.form.published_at_time} onChange={changes} className="form-control" />
                    </div>) : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <button className="btn btn-info">Update</button>
            <Link to={`/my-blog/${blogId}/post`} className="btn btn-link ml-2">Cancel</Link>
          </div>
        </form>
      </React.Fragment>
    )
  }

export default MyPostEdit
