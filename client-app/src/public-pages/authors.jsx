import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RootContext } from "../context/rootContext";
import { Api, handleApiError } from "../helper/Api";
import PageHeader from "../partials/page-header";
import * as Icon from "react-feather"

const Authors = props => {
  const { store, dispatch } = useContext(RootContext)
  document.title = 'Authors' + store.docTitle
  const [state, setState] = useState({
    listData: []
  })

  const fetchData = () => {
    Api.get('author', store.authHeader)
      .then(res => {
        setState({
          ...state,
          listData: res.data.authors
        })
      })
      .catch(err => handleApiError(err, store, dispatch))
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      <PageHeader title="Authors" />
      <div className="row">
        {state.listData.map(data => (
          <div className="col-md-6 mb-3" key={data._id}>
            <div className="border p-3 d-flex">
              <div className="mr-3">
                <img src={data.photo} alt="profile pic" style={{width:'64px'}} />
              </div>
              <div>
                <h6 className="mb-1">
                  <Link to={`/author/${data.username}`}>
                    {data.fullname}
                  </Link>
                </h6>
                <p className="text-muted mb-0">
                  <Icon.AtSign />
                  {data.username}
                </p>
                <p className="text-muted mb-1">
                  <span>
                    <Icon.Folder />
                    {data.blog_count} blogs
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}
export default Authors;