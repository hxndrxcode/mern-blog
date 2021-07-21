import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RootContext } from '../context/rootContext';

const PrivateRoute = ({
    component: Component
}) => {
    const { store } = useContext(RootContext)

    return (
        <Route
            render={props =>
                store.authuser ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}


export default PrivateRoute;