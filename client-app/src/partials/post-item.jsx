import React from "react"
import * as Icon from 'react-feather'
import { Link } from "react-router-dom"

const PostItem = ({ data, showBlog = true }) => {
  return (
    <React.Fragment>
      <div className="border p-3 mb-3">
        <img src={data.thumbnail} alt="thumbnail" className="float-right d-none d-sm-inline ml-3"
          style={{width: '85px'}} />
        <h6 className="mb-2">
          <a href={`${data.domain}/post/${data.permalink}?ref=app.blogwi.org`} target="_blank" rel="noopener noreferrer">
            {data.title}
          </a>
        </h6>
        <p className="text-muted mb-0">
          <span>
            {data.formatted_date}
          </span>
          <span className="ml-3">
            <Icon.MessageSquare />
            {data.comment_count}
          </span>
        </p>
        <p className="mb-0">
          {data.body.substr(0, 70)}...
        </p>
        {showBlog && (
          <p className="mb-0 mt-1 text-muted">
            <Icon.Folder />
            <Link to={{
              pathname: '/blog/' + data.blog._id,
              state: {
                from: '/',
                fromTitle: 'Feed'
              }
            }}>
              {data.blog.title}
            </Link>
          </p>
        )}
      </div>

    </React.Fragment>
  )
}

export default PostItem