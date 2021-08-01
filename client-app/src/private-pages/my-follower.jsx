import axios from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { RootContext } from "../context/rootContext"
import PageHeader from "../partials/page-header"
import * as Icon from "react-feather"
import { handleApiError } from "../helper/Api"
import MyBlogMenu from "../partials/my-blog-menu"

const MyFollower = props => {
  const { store, dispatch } = useContext(RootContext)
  document.title = 'My Follower' + store.docTitle
  const { blogId } = useParams()
  const [state, setState] = useState({
    blogId,
    blogData: {},
    listData: [],
    search: ''
  })

  const fetchData = () => {
    axios.get(`${store.apiUrl}/myfollower?blog_id=${state.blogId}&search=${state.search}`, store.authHeader)
      .then(({ data }) => {
        setState({
          ...state,
          listData: data.data.followers,
          blogData: data.data.blog
        })
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

//   const toggleItem = e => {
//     let data = {
//       blog_id: state.blogId,
//       action: e.target.dataset.action,
//       checked: [e.target.dataset.id]
//     }
//     axios.post(`${store.apiUrl}/myfollower/bulkaction`, data, store.authHeader)
//       .then(res => {
//         fetchData()
//       })
//       .catch(e => handleApiError(e, store, dispatch))
//   }

  const keySearch = e => {
    if (e.code !== 'Enter') return false;
    setState({
      ...state,
      search: e.target.value
    })
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.search])

  return !state.blogData.title ? '' : (
    <React.Fragment>
      <PageHeader title={state.blogData.title}>
        <MyBlogMenu blogId={blogId} path="follower" />
      </PageHeader>
      <div className="mb-3">
        <input type="text" onKeyUp={keySearch} className="form-control" placeholder="Search" />
      </div>
      {state.listData.map(v => {
        return (
          <div className="border p-3 mb-3" key={v._id}>
            <div className="d-flex">
              <div>
                <img src={v.user.photo} alt="" />
              </div>
              <div className="ml-3">
                <p className="mb-2">{v.user.username} ({v.user.fullname})</p>
                <button type="button" className="btn btn-sm btn-light">
                  <Icon.Eye /> View
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </React.Fragment >
  )
}

export default MyFollower