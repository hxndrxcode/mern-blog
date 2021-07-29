import React from 'react'
import { Link } from 'react-router-dom'
// import * as Icon from "react-feather"

const MyBlogMenu = props => {
    const linkList = [
        { path: 'post', text: 'Post' },
        { path: 'comment', text: 'Comment' },
        { path: 'page', text: 'Page' },
        { path: 'setting', text: 'Setting' }
    ]
    return (
        <React.Fragment>
            <div className="dropdown d-inline-block">
                <button className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">
                    Menu
                </button>
                <div className="dropdown-menu">
                    {linkList.map(v => {
                        return (
                            <Link to={`/my-blog/${props.blogId}/${v.path}`}
                                className={'dropdown-item ' + ((v.path === props.path) && 'bg-info text-white')}
                                key={v.path}>
                                {v.text}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </React.Fragment>
    )
}

export default MyBlogMenu