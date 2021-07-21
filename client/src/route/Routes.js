import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Feed from "../components/main/Feed";
import Blogs from "../components/main/Blogs";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import MyBlog from "../components/main/MyBlog";
import MyAccount from "../components/main/MyAccount";
import PrivateRoute from './PrivateRoute';
import { RootContext } from '../context/rootContext';
import axios from 'axios';

const Routes = props => {
  const { store, dispatch } = useContext(RootContext)
  const [state, setState] = useState({
    isLoading: true,
  })

  const checkAuth = () => {
    const jwtToken = localStorage.getItem('jwt_token')
    if (!jwtToken) {
      if (store.authuser) {
        dispatch({
          type: 'set_user',
          data: null
        })
      }
      setState({
        isLoading: false,
      })
    } else {
      if (store.authuser) {
        setState({
          isLoading: false
        })
      } else {
        axios.get('http://localhost:3000/api/auth/user', store.authHeader)
          .then(({ data }) => {
            dispatch({
              type: 'set_user',
              data: data.user
            })
          })
          .catch(() => {
            localStorage.removeItem('jwt_token')
          })
          .then(() => {
            setState({
              isLoading: false
            })
          })
      }
    }
  }

  useEffect(() => {
    // checkAuth()
    setTimeout(checkAuth, 1200)
    window.addEventListener('storage', () => {
      if (!localStorage.getItem('jwt_token')) {
          dispatch({
          type: 'set_logout'
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state.isLoading ? (<div>Loading....</div>) : (
    <div>
      <Switch>
        <Route exact path="/" component={Feed} />
        <Route exact path="/trending" component={Feed} />
        <Route exact path="/blogs" component={Blogs} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />

        <PrivateRoute path="/my-blog" component={MyBlog} />
        <PrivateRoute path="/my-account" component={MyAccount} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </div>
  )
}

export default Routes
