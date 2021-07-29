import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RootContext } from "../context/rootContext";
import PageHeader from "../partials/page-header";
import * as Icon from "react-feather"
import { handleApiError } from "../helper/Api";

const MyBlog = () => {
    const { store, dispatch } = useContext(RootContext)
    const [state, setState] = useState({
        listData: []
    })

    const fetchData = () => {
        axios.get(store.apiUrl + '/myblog', store.authHeader)
            .then(({ data }) => {
                setState({
                    ...state,
                    listData: data.data
                })
            })
            .catch(err => {
                handleApiError(err, store, dispatch)
            })
            .then(() => {
            })
    }
    useEffect(() => {
        document.title = 'My Blog' + store.docTitle
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <React.Fragment>
            <PageHeader title="My Blog" />
            <div>
                <div className="mb-3">
                    <Link to="/my-blog/create" className="btn btn-outline-info">Create Blog</Link>
                </div>
                <div className="row">
                    {state.listData.map((v, k) => {
                        return (
                            <div className="col-md-6 mb-3" key={k}>
                                <div className="p-3 border">
                                    <h5>{v.title}</h5>
                                    <div className="mb-2">
                                        <a href={v.domain} target="_blank" rel="noreferrer noopener">
                                            {v.domain}
                                        </a>
                                    </div>
                                    <Link to={"/my-blog/" + v._id} className="btn btn-sm mr-2 btn-light">
                                        <Icon.Tool />
                                        Manage
                                    </Link>
                                    <Link to={"/blogs/view/" + v._id} className="btn btn-sm mr-2 btn-light">
                                        <Icon.Eye />
                                        View
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </React.Fragment>
    );
}
export default MyBlog;