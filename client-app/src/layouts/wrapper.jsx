import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { RootContext } from '../context/rootContext';
import Loading from '../partials/loading';
// import axios from 'axios';

const Wrapper = ({ children }) => {
  const { store, dispatch } = useContext(RootContext)
  const [state, setState] = useState({
    isLoading: true
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
      setState({ ...state, isLoading: false })
    } else {
      if (store.authuser) {
        setState({ ...state, isLoading: false })
      } else {
        axios.get(store.apiUrl + '/auth/user', store.authHeader)
          .then(({ data }) => {
            dispatch({
              type: 'set_user',
              data: data.user
            })
            setState({ ...state, isLoading: false })
          })
          .catch(() => {
            localStorage.removeItem('jwt_token')
            setState({ ...state, isLoading: false })
          })
      }
    }
  }

  useEffect(() => {
    // checkAuth()
    setTimeout(checkAuth, 500)
    window.addEventListener('storage', () => {
      if (!localStorage.getItem('jwt_token')) {
        dispatch('set_logout')
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state.isLoading ? <Loading /> : (
    <React.Fragment>{children}</React.Fragment>
  )
}

export default Wrapper
