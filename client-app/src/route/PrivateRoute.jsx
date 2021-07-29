import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RootContext } from '../context/rootContext';

const PrivateRoute = ({
    component: Component,
    path
}) => {
    const { store } = useContext(RootContext)
    return !store.authuser ? (<Redirect to="/login" />) : (
        <Route exact path={path} component={Component} />
    );
}


export default PrivateRoute;