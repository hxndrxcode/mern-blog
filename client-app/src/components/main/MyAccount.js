import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { RootContext } from "../../context/rootContext";

const Page = () => {
    const { dispatch } = useContext(RootContext)
    const onLogout = () => {
        dispatch({
            type: 'set_logout'
        })
        return (
            <Redirect to="/" />
        )
    }

    return (
        <div>
            <h2>Akun Saya</h2>
            <button onClick={onLogout} className="btn btn-danger">Logout</button>
        </div>
    );
}
export default Page;