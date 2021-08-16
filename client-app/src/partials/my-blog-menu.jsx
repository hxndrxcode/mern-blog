import React from 'react'
import { Link } from 'react-router-dom'

const MyBlogMenu = props => {
    const linkList = [
        { path: 'overview', text: 'Overview' },
        { path: 'post', text: 'Post' },
        { path: 'comment', text: 'Comment' },
        { path: 'page', text: 'Page' },
        { path: 'follower', text: 'Follower' },
        { path: 'layout', text: 'Layout' },
        { path: 'setting', text: 'Setting' },
    ]
    let activeIndex = linkList.findIndex(v => v.path === props.path)
    return (
        <React.Fragment>
            <div className="dropdown float-right">
                <span className="btn-link dropdown-toggle" style={{fontSize: 'initial'}} data-toggle="dropdown">
                    {activeIndex >= 0 ? linkList[activeIndex].text : ''}&nbsp;
                </span>
                <div className="dropdown-menu dropdown-menu-right">
                    {linkList.map(v => {
                        let path = (v.path === 'overview' ? '' : '/' + v.path)
                        return (
                            <Link to={`/my-blog/${props.blogId + path}`}
                                className={'dropdown-item ' + ((v.path === props.path) && 'bg-info text-white')}
                                key={v.path}>
                                {v.text}
                            </Link>
                        )
                    })}
                    <div className="dropdown-divider"></div>
                    <Link to="/my-blog" className="dropdown-item">
                        &larr; My Blog
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MyBlogMenu