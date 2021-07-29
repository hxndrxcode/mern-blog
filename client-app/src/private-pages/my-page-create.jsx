import axios from "axios"
import moment from 'moment'
import React, { useContext, useEffect, useState } from "react"
import { Redirect, useParams } from "react-router-dom"
import { RootContext } from "../context/rootContext"
import PageHeader from "../partials/page-header"

const MyPageCreate
 = props => {
  const { store } = useContext(RootContext)
  document.title = 'Create Page' + store.docTitle
  const { blogId } = useParams()
  const [state, setState] = useState({
    blogId,
    form: {
      blog_id: blogId,
      title: '',
      permalink: '',
      body: '',
      published_at_date: moment().format('YYYY-MM-DD'),
      published_at_time: moment().add(1, 'hour').format('HH:mm'),
      is_published: true,
      publish_soon: true,
    },
    isDone: false
  })

  const changes = e => {
    let val = e.target.value
    if (e.target.id === 'is_published' || e.target.id === 'publish_soon') {
      val = JSON.parse(val)
    }
    setState({
      ...state,
      form: {
        ...state.form,
        [e.target.id]: val
      }
    })
  }

  const submitCreate = e => {
    e.preventDefault()
    axios.post(store.apiUrl + '/mypage', state.form, store.authHeader)
      .then(({ data }) => {
        setState({
          ...state,
          isDone: true
        })
      })
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state.isDone ? <Redirect to={props.match.url.replace('/create', '')} /> : (
    <React.Fragment>
      <PageHeader title="Create Page" btnLink={`/my-blog/${blogId}/page`} btnText="Page" />
      <form onSubmit={submitCreate}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" value={state.form.title} onChange={changes} placeholder="Page title" />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea className="form-control" id="body" value={state.form.body} onChange={changes} rows="10" placeholder="Page body"></textarea>
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
        <button className="btn btn-info mt-3">Submit</button>
      </form>
    </React.Fragment>
  )
}

export default MyPageCreate
