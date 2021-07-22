import axios from 'axios'
import React, { useContext, useEffect } from "react"
import { RootContext } from "../../context/rootContext"

const ManageMyBlog = props => {
    const { store } = useContext(RootContext)
    const fetchBlogDetail = () => {
        axios.get(store.apiUrl + '/my/blog/' + props.parentState.blogId, store.authHeader)
            .then(res => {
                props.parentSetState({
                    ...props.parentState,
                    blogData: res.data.data,
                    loadingBlogData: false
                })
            })
    }

    useEffect(() => {
        setTimeout(fetchBlogDetail, 500)
        // fetchBlogDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div>Loading blog data...</div>
}

export default ManageMyBlog