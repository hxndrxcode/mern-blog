import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { RootContext } from "../context/rootContext"
import PageHeader from "../partials/page-header"
import * as Icon from "react-feather"
import BulkAction from "../partials/bulk-action"
import { handleApiError } from "../helper/Api"
import MyBlogMenu from "../partials/my-blog-menu"

const MyPost = props => {
  const { store, dispatch } = useContext(RootContext)
  document.title = 'My Post' + store.docTitle
  const { blogId } = useParams()
  const [state, setState] = useState({
    blogId,
    listData: [],
    checked: [],
    search: ''
  })

  const checkChange = e => {
    let currentChecked = state.checked
    let idx = currentChecked.indexOf(e.target.value)
    if (idx >= 0) {
      currentChecked.splice(idx, 1)
    } else {
      currentChecked.push(e.target.value)
    }
    setState({
      ...state,
      checked: currentChecked
    })
  }

  const keySearch = e => {
    if (e.code !== 'Enter') return false;
    setState({
      ...state,
      search: e.target.value
    })
  }

  const fetchPost = () => {
    axios.get(`${store.apiUrl}/mypost?blog_id=${state.blogId}&search=${state.search}`, store.authHeader)
      .then(({ data }) => {
        setState({
          ...state,
          listData: data.data
        })
      })
  }

  const deleteItem = () => {
    let data = {
      action: 'delete',
      blog_id: state.blogId,
      checked: state.checked
    }
    axios.post(store.apiUrl + '/mypost/bulkaction', data, store.authHeader)
      .then(res => {
        fetchPost()
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

  const draftItem = () => {
    console.log('draftItem')
  }

  const bulkAction = [
    {
      text: 'Delete',
      callback: deleteItem
    },    
    {
      text: 'Set to draft',
      callback: draftItem
    }
  ]
  useEffect(() => {
    fetchPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.search])

  return (
    <React.Fragment>
      <PageHeader title="Post" btnLink="/my-blog" btnText="My Blog" btnArrow="left">
        <MyBlogMenu blogId={blogId} path="post" />
      </PageHeader>
      <div className="mb-3">
        <Link to={`${props.match.url}/create`} className="btn btn-outline-info">
          Create Post
        </Link>
      </div>
      <div className="mb-3">
        <input type="text" onKeyUp={keySearch} className="form-control" placeholder="Search" />
      </div>
      {state.listData.map(v => {
        return (
          <div className="border p-3 mb-3" key={v._id}>
            <h6>{v.title}</h6>
            <p className="text-muted">
              {!v.is_published ? (<u className="mr-3">
                <Icon.Archive />
                Draft
              </u>) : ''}
              <span>
                <Icon.Clock />
                {v.formatted_date}
              </span>
              <span className="ml-3">
                <Icon.MessageSquare />
                {v.comment_count}
              </span>
            </p>
            <label htmlFor={'id_' + v._id} className="btn btn-sm btn-light mb-0 mr-2">
              <input type="checkbox" id={'id_' + v._id} value={v._id} checked={state.checked.includes(v._id)} onChange={checkChange} />
            </label>
            <Link to={`${props.match.url}/${v._id}/edit`} className="btn btn-sm mr-2 btn-light">
              <Icon.Edit />
              Edit
            </Link>
            <Link to={"/blogs/view/" + v._id} className="btn btn-sm mr-2 btn-light">
              <Icon.ExternalLink />
              Visit
            </Link>
          </div>
        )
      })}
      <BulkAction action={bulkAction} parentState={state} parentSetState={setState} />
    </React.Fragment>
  )
}

export default MyPost