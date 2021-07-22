import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RootContext } from "../../context/rootContext";
import PageHeader from "../partial/PageHeader";
import * as Icon from "react-feather"

const Page = () => {
    const { store, dispatch } = useContext(RootContext)
    const [state, setState] = useState({
        listData: []
    })

    const fetchData = () => {
        axios.get(store.apiUrl + '/my/blog', store.authHeader)
            .then(({ data }) => {
                setState({
                    ...state,
                    listData: data.data
                })
            })
            .catch(({ response }) => {
                if (response.status === 401) {
                    dispatch({
                        type: 'set_logout'
                    })
                }
            })
            .then(() => {
            })
    }
    useEffect(() => {
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
                                        <a href={"http://" + v.domain} target="_blank" rel="noreferrer noopener">
                                            http://{v.domain}
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
export default Page;