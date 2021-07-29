import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { RootContext } from "../context/rootContext"
import PageHeader from "../partials/page-header"
import * as Icon from "react-feather"
import { handleApiError } from "../helper/Api"
import MyBlogMenu from "../partials/my-blog-menu"

const MyComment = props => {
  const { store, dispatch } = useContext(RootContext)
  document.title = 'My Comment' + store.docTitle
  const { blogId } = useParams()
  const [state, setState] = useState({
    blogId,
    listData: [],
    postId: ''
  })

  const fetchData = () => {
    axios.get(`${store.apiUrl}/mycomment?blog_id=${state.blogId}&postId=${state.postId}`, store.authHeader)
      .then(({ data }) => {
        setState({
          ...state,
          listData: data.data
        })
      })
  }

  const toggleItem = e => {
    let data = {
      blog_id: state.blogId,
      action: e.target.dataset.action,
      checked: [e.target.dataset.id]
    }
    axios.post(`${store.apiUrl}/mycomment/bulkaction`, data, store.authHeader)
      .then(res => {
        fetchData()
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.search])

  return (
    <React.Fragment>
      <PageHeader title="Comment" btnLink="/my-blog" btnText="My Blog" btnArrow="left">
        <MyBlogMenu blogId={blogId} path="comment" />
      </PageHeader>
      {state.listData.map(v => {
        return (
          <div className="border p-3 mb-3" key={v._id}>
            <p className="text-muted">
              <span>
                <Icon.Clock />
                {v.formatted_date}
              </span>
              <span className="ml-2">
                <Icon.Edit />
                {v.post.title.substr(0, 30)}...
              </span>
            </p>
            <p className="">
              {v.comment.substr(0, 100)}
            </p>
            {v.is_hidden ? (
              <button onClick={toggleItem} data-id={v._id} data-action="show" className="btn btn-sm mr-2 btn-light">
                <Icon.Eye /> Show
              </button>
            ) : (
              <button onClick={toggleItem} data-id={v._id} data-action="hide" className="btn btn-sm mr-2 btn-light">
                <Icon.EyeOff /> Hide
              </button>
            )}
          </div>
        )
      })}
    </React.Fragment >
  )
}

export default MyComment