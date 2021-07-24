import React from "react"
import * as Icon from 'react-feather'
import { Link } from "react-router-dom"

const BlogItem = ({ data }) => {
  return (
    <React.Fragment>
      <div className="border p-3 mb-3">
        <img src={data.logo} alt="logo" className="float-right d-none d-sm-inline ml-2" />
        <h5 className="mb-2">
          <Link to={`/blogs/${data._id}`}>
            {data.title}
          </Link>
        </h5>
        <p className="text-muted mb-2">
          <span>
            {data.domain}
          </span>
          <span className="ml-3">
            <Icon.Users />
            {data.follower_count}
          </span>
          <span className="ml-3">
            <Icon.Edit />
            {data.post_count}
          </span>
        </p>
        <button className="btn btn-info btn-sm">Follow</button>
      </div>

    </React.Fragment>
  )
}

export default BlogItem