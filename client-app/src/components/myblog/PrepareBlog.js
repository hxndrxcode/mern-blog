import axios from 'axios'
import React, { useContext, useEffect } from "react"
import { RootContext } from "../../context/rootContext"
import Loading from '../partial/Loading'

const PrepareBlog = ({ parentState, parentSetState }) => {
    const { store } = useContext(RootContext)
    const fetchBlogDetail = () => {
        axios.get(store.apiUrl + '/myblog/' + parentState.blogId, store.authHeader)
            .then(res => {
                parentSetState({
                    ...parentState,
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

    return <Loading />
}

export default PrepareBlog