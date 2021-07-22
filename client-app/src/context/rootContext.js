import React, { createContext, useReducer } from "react";
import reducer from "./reducer";
export const RootContext = createContext()

const RootProvider = ({ children }) => {
  const jwtToken = localStorage.getItem('jwt_token') || ''
  const [ store, dispatch ] = useReducer(reducer, {
    authuser: null,
    authLoading: true,
    siteTitle: 'app.blogwf.com',
    apiUrl: process.env.REACT_APP_API_URL,
    lpUrl: process.env.REACT_APP_LP_URL,
    authHeader: {
      headers: { Authorization: 'Bearer ' + jwtToken }
    },
    jwtToken
  })
  return (
    <RootContext.Provider value={{ store, dispatch }}>
      {children}
    </RootContext.Provider>
  );
};

export default RootProvider;