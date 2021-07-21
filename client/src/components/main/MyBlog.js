import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { RootContext } from "../../context/rootContext";

const Page = () => {
    const { store, dispatch } = useContext(RootContext)
    const [state, setState] = useState({
        listData: []
    })

    const fetchData = () => {
        axios.get('http://localhost:3000/api/my/blog', store.authHeader)
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
        <div>
            <h2>Blog Saya</h2>
            {state.listData.map((v, k) => {
                return (
                    <React.Fragment key={k}>
                        <h5>{v.title}</h5>
                        <em>http://{v.domain}</em>
                    </React.Fragment>
                )
            })}
        </div>
    );
}
export default Page;