import React, { createContext, useReducer } from "react";
import reducer from "./reducer";
export const RootContext = createContext()

const {
  REACT_APP_SITE_NAME,
  REACT_APP_API_URL,
  REACT_APP_LP_URL
} = process.env

const RootProvider = ({ children }) => {
  const jwtToken = localStorage.getItem('jwt_token') || ''
  const siteName = 'app.' + REACT_APP_SITE_NAME
  const [ store, dispatch ] = useReducer(reducer, {
    authuser: null,
    firstLoading: true,
    siteName,
    lpSiteName: REACT_APP_SITE_NAME,
    apiUrl: REACT_APP_API_URL,
    lpUrl: REACT_APP_LP_URL,
    authHeader: {
      headers: { Authorization: 'Bearer ' + jwtToken }
    },
    jwtToken,
    docTitle: ' - ' + siteName
  })
  return  (
    <RootContext.Provider value={{ store, dispatch }}>
      {children}
    </RootContext.Provider>
  );
};

export default RootProvider;