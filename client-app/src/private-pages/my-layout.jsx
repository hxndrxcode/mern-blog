import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { RootContext } from "../context/rootContext"
import { Api, handleApiError } from "../helper/Api"
import MyBlogMenu from "../partials/my-blog-menu"
import PageHeader from "../partials/page-header"
import * as Icon from 'react-feather'

const MyLayout
  = props => {
    const { store, dispatch } = useContext(RootContext)
    document.title = 'Layout' + store.docTitle
    const { blogId } = useParams()
    const [state, setState] = useState({
      blogId,
      blogData: {
        labels: []
      },
      blogPages: [],
      custom_css: '',
      custom_css_replace: false,
      navbar: [],
      isDone: false
    })

    const getData = () => {
      Api.get('myblog/' + blogId, store.authHeader)
        .then(res => {
          setState({
            ...state,
            custom_css: res.data.blog.custom_style.css,
            custom_css_replace: res.data.blog.custom_style.is_replace,
            navbar: res.data.blog.navbar,
            blogData: res.data.blog
          })
        })
        .catch(err => handleApiError(err, store, dispatch))
    }

    const changes = e => {
      let val = e.target.value
      if (e.target.id === 'custom_css_replace') {
        val = e.target.checked
      }
      setState({
        ...state,
        [e.target.id]: val
      })
    }

    const submitCSS = e => {
      e.preventDefault()

      Api.put('/myblog/' + blogId + '/style', state, store.authHeader)
        .then(({ data }) => {
          setState({
            ...state,
            isDone: true
          })
        })
        .catch(err => handleApiError(err, store, dispatch))
    }

    const submitNavbar = e => {
      e.preventDefault()
      Api.put('/myblog/' + blogId + '/navbar', state, store.authHeader)
        .then(({ data }) => {
          setState({
            ...state,
            isDone: true
          })
        })
        .catch(err => handleApiError(err, store, dispatch))
    }

    const addNavbar = (idx) => {
      idx++
      state.navbar.splice(idx, 0, '')
      setState({
        ...state,
        navbar: state.navbar
      })
    }

    const deleteNavbar = (idx) => {
      state.navbar.splice(idx, 1)
      setState({
        ...state,
        navbar: state.navbar
      })
    }

    const selectNavbar = e => {
      let idx = e.target.dataset.index
      state.navbar[idx] = e.target.value
      setState({
        ...state,
        navbar: state.navbar
      })
    }

    useEffect(() => {
      getData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return !state.blogData.title ? '' : (
      <React.Fragment>
        <PageHeader title={state.blogData.title}>
          <MyBlogMenu blogId={blogId} path="layout" />
        </PageHeader>
        <h5>Custom Style</h5>
        <form onSubmit={submitCSS} className="border p-3 mb-4">
          <div className="form-group">
            <label htmlFor="custom_css">CSS</label>
            <textarea className="form-control" id="custom_css" value={state.custom_css} onChange={changes} rows="7"></textarea>
          </div>
          <label htmlFor="custom_css_replace">
            <input type="checkbox" id="custom_css_replace" checked={state.custom_css_replace} onChange={changes} />
            <span className="ml-2">Replace</span>
          </label>
          <br />
          <button className="btn btn-info">Submit</button>
        </form>
        <h5>Navbar</h5>
        <form onSubmit={submitNavbar} className="border p-3">
          <div>
            <button type="button" onClick={() => { addNavbar(-1)}} className="btn btn-light border mb-2">
              <Icon.Plus />
            </button>
          </div>
          {state.navbar.map((w, k) => {
            return (
              <div className="btn-group w-100 mb-2" key={k}>
                <button type="button" onClick={() => { addNavbar(k)}} className="btn btn-light border">
                  <Icon.Plus />
                </button>
                <button type="button" onClick={() => { deleteNavbar(k)}} className="btn btn-light border">
                  <Icon.X />
                </button>
                <select value={w} onChange={selectNavbar} data-index={k} className="form-control">
                  <option value="">-</option>
                  <optgroup label="Label">
                    {state.blogData.labels.map(v => {
                      return <option key={v} value={'label::' + v}>{v}</option>
                    })}
                  </optgroup>
                  <optgroup label="Page">
                    {state.blogPages.map(v => {
                      return <option key={v._id} value={'page::' + v._id}>{v.title}</option>
                    })}
                  </optgroup>
                </select>
              </div>
            )
          })}
          <br />
          <button className="btn btn-info mt-2">Submit</button>
        </form>
      </React.Fragment>
    )
  }

export default MyLayout
