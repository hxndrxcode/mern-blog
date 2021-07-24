import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { RootContext } from "../../context/rootContext"
import PageHeader from "../partial/PageHeader"
import * as Icon from "react-feather"
import DropdownMenu from "./DropdownMenu"

const MyBlogPost = props => {
  const { store } = useContext(RootContext)
  document.title = 'My Post' + store.docTitle
  const { blogId } = useParams()
  const [state, setState] = useState({
    blogId,
    listData: []
  })

  const fetchPost = () => {
    axios.get(store.apiUrl + '/mypost?blog_id=' + state.blogId, store.authHeader)
      .then(({ data }) => {
        setState({
          ...state,
          listData: data.data
        })
      })
  }

  useEffect(() => {
    setTimeout(fetchPost, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <PageHeader title="Post" btnLink="/my-blog" btnText="My Blog" btnArrow="left">
        <DropdownMenu blogId={blogId} path="post" />
      </PageHeader>
      <div className="mb-3">
        <Link to={`${props.match.url}/create`} className="btn btn-outline-info">
          Create Post
        </Link>
      </div>
      {state.listData.map(v => {
        return (
          <div className="border p-3 mb-3" key={v._id}>
            <h6>{v.title}</h6>
            <p className="text-muted">
              <span>
                <Icon.Clock />
                {v.formatted_date}
              </span>
              <span className="ml-3">
                <Icon.MessageSquare />
                {v.comment_count}
              </span>
            </p>
            <Link to={`${props.match.url}/${v._id}/edit`} className="btn btn-sm mr-2 btn-light">
              <Icon.Edit />
              Edit
            </Link>
            <Link to={"/blogs/view/" + v._id} className="btn btn-sm mr-2 btn-light">
              <Icon.Eye />
              View
            </Link>
          </div>
        )
      })}
    </React.Fragment>
  )
}

export default MyBlogPost