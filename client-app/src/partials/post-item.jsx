import React from "react"
import * as Icon from 'react-feather'

const PostItem = ({ data }) => {
  return (
    <React.Fragment>
      <div className="border p-3 mb-3">
        <img src={data.thumbnail} alt="thumbnail" className="float-right d-none d-sm-inline ml-2" />
        <h6 className="mb-2">
          <a href={`${data.domain}/post/${data.permalink}`}>
            {data.title}
          </a>
        </h6>
        <p className="text-muted mb-1">
          <span>
            <Icon.Clock />
            {data.formatted_date}
          </span>
          <span className="ml-3">
            <Icon.MessageSquare />
            {data.comment_count}
          </span>
        </p>
        <p className="mb-0">
          {data.body.substr(0, 60)}
        </p>
      </div>

    </React.Fragment>
  )
}

export default PostItem