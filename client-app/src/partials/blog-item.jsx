import React from "react"
import * as Icon from 'react-feather'
import { Link } from "react-router-dom"

const BlogItem = ({ data, doFollow, doUnfollow }) => {
  return (
    <React.Fragment>
      <div className="border p-3 mb-3">
        <img src={data.logo} alt="logo" className="float-right d-none d-sm-inline ml-2" />
        <h6 className="mb-2">
          <Link to={`/blog/${data._id}`}>
            {data.title}
          </Link>
        </h6>
        <p className="mb-2">{data.tagline}</p>
        <p className="text-muted mb-1">
          <span>
            <Icon.Globe />
            {data.hostname}
          </span>
        </p>
        <p className="text-muted mb-2">
          <span className="">
            <Icon.Edit />
            {data.post_count} posts
          </span>
          <span className="ml-3">
            <Icon.Users />
            {data.follower_count} followers
          </span>
        </p>
        {data.is_followed ? (
          <button onClick={doUnfollow} data-id={data._id} className="btn btn-info btn-sm">Unfollow</button>
        ) : (
          <button onClick={doFollow} data-id={data._id} className="btn btn-info btn-sm">Follow</button>
        )}
      </div>

    </React.Fragment>
  )
}

export default BlogItem