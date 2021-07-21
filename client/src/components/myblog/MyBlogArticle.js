import React, { useState } from "react"
import { useParams } from "react-router-dom"
import PageHeader from "../partial/PageHeader"
import ManageMyBlog from "./ManageMyBlog"

const MyBlogArticle = props => {
    const { blogId } = useParams()
    const [state, setState] = useState({
        loadingBlogData: true,
        blogId,
        blogData: {}
    })

    return state.loadingBlogData ? <ManageMyBlog parentState={state} parentSetState={setState} /> : (
        <React.Fragment>
            <PageHeader title="Article" btnLink="/my-blog" btnText="My Blog" btnArrow="left" />
            <div>Domain: {state.blogData.domain}</div>
        </React.Fragment>
    )
}

export default MyBlogArticle