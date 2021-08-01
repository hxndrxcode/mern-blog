import React, { useContext, useEffect } from 'react'
import { RootContext } from '../context/rootContext'

const Toast = () => {
  const { store, dispatch } = useContext(RootContext)
  const hideAlert = () => {
    if (store.alert) {
      dispatch('hide_alert')
    }
  }
  useEffect(() => {
    setTimeout(() => {
      hideAlert()
    }, 3000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={"alert alert-" + store.alert.status + " alert-dismissible fade show"} role="alert">
      {store.alert.message}
      <button type="button" onClick={hideAlert} className="close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

export default Toast