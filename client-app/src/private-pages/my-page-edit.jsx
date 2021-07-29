import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Link, Redirect, useParams } from "react-router-dom"
import { RootContext } from "../context/rootContext"
import { handleApiError } from "../helper/Api"
import PageHeader from "../partials/page-header"

const MyPageEdit
  = props => {
    const { store, dispatch } = useContext(RootContext)
    document.title = 'Edit Page' + store.docTitle
    const { blogId, pageId } = useParams()
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
      axios.put(`${store.apiUrl}/mypage/${pageId}`, state.form, store.authHeader)
        .then(({ data }) => {
          setState({
            ...state,
            isDone: true
          })
        })
        .catch(e => handleApiError(e, store, dispatch))
    }

    const fetchPageDetail = () => {
      axios.get(`${store.apiUrl}/mypage/${pageId}?blog_id=${blogId}`, store.authHeader)
        .then(({ data }) => {
          setState({
            ...state,
            form: data.data
          })
        })
    }
    useEffect(() => {
      setTimeout(fetchPageDetail, 500)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return state.isDone ? <Redirect to={props.match.url.replace(`/${pageId}/edit`, '')} /> : (
      <React.Fragment>
        <PageHeader title="Edit Page" btnLink={`/my-blog/${blogId}/page`} btnText="Page" />
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
              </div>
            </div>
          </div>
          <div className="mt-3">
            <button className="btn btn-info">Update</button>
            <Link to={`/my-blog/${blogId}/page`} className="btn btn-link ml-2">Cancel</Link>
          </div>
        </form>
      </React.Fragment>
    )
  }

export default MyPageEdit
