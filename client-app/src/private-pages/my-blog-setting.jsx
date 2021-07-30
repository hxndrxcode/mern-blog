import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../partials/page-header";
import { useParams } from "react-router-dom";
import { RootContext } from "../context/rootContext";
import axios from "axios";
import { handleApiError } from "../helper/Api";
import MyBlogMenu from "../partials/my-blog-menu";

const MyBlogSetting = props => {
  const { store, dispatch } = useContext(RootContext)
  const { blogId } = useParams()
  const [state, setState] = useState({
    blogId,
    form: {
      domain: '',
      subdomain: '',
      scheme: 'http://',
      title: '',
      tagline: '',
      logo: '',
    },
    backupLogo: '',
    isLogoUploaded: false,
    isComplete: false,
    update: 0
  })

  const fetchBlog = () => {
    axios.get(`${store.apiUrl}/myblog/${blogId}`, store.authHeader)
      .then(res => {
        let form = res.data.data
        setState({
          ...state,
          form,
          backupLogo: form.logo
        })
      })
  }

  const changes = e => {
    let form = state.form
    form[e.target.id] = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    if (e.target.id === 'domain_type' && e.target.value === 'subdomain') {
      form.is_https = true
    }
    setState({
      ...state,
      form
    })
  }

  const onUpload = e => {
    let file = e.target.files[0]
    if (!file) {
      return false
    }

    let formData = new FormData()
    formData.append('image', file)
    formData.append('width', 64)
    formData.append('hight', 64)
    let option = JSON.parse(JSON.stringify(store.authHeader))
    option.headers['Content-Type'] = 'multipart/form-data'

    axios.post('https://img.vosy.net/upload/file', formData, option)
      .then(res => {
        e.target.files = null
        let form = state.form
        form.logo = 'https://img.vosy.net' + res.data.url
        setState({
          ...state,
          form,
          isLogoUploaded: true
        })
      })
  }

  const resetUpload = e => {
    let form = state.form
    form.logo = state.backupLogo
    setState({
      ...state,
      form,
      isLogoUploaded: false
    })
  }

  const submitForm = e => {
    e.preventDefault()
    axios.put(`${store.apiUrl}/myblog/${blogId}/${e.target.dataset.section}`, state.form, store.authHeader)
      .then(res => {
        setState({
          ...state,
          isComplete: true,
          update: Date.now(),
          isLogoUploaded: false
        })
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

  useEffect(() => {
    fetchBlog()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.update])
  return (
    <React.Fragment>
      <PageHeader title="Setting" btnLink="/my-blog" btnText="My Blog">
        <MyBlogMenu blogId={blogId} path="setting" />
      </PageHeader>
      <h5>General</h5>
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={submitForm} data-section="general" className="col-md-8 offset-md-2 px-0">
            <div className="form-group">
              <label>Title</label>
              <input type="text" id="title" value={state.form.title} onChange={changes} className="form-control" />
            </div>
            <div className="form-group">
              <label>Tagline</label>
              <input type="text" id="tagline" value={state.form.tagline} onChange={changes} className="form-control" />
            </div>
            <div className="form-group">
              <label>Logo</label>
              <div className="d-flex">
                <img src={state.form.logo} alt="logo" className="mr-3" />
                <div>
                  {state.isLogoUploaded ? (
                    <button type="button" onClick={resetUpload} className="btn btn-light btn-sm">Revert Logo</button>
                  ) : (
                    <input type="file" onChange={onUpload} id="file_logo" className="form-control" />
                  )}
                  <input type="text" id="logo" value={state.form.logo} onChange={changes} className="form-control d-none" />
                </div>
              </div>
            </div>
            <button className="btn btn-info">Submit</button>
          </form>
        </div>
      </div>
      <h5>Domain</h5>
      <div className="card">
        <div className="card-body">
          <form onSubmit={submitForm} data-section="domain" className="col-md-8 offset-md-2 px-0">
            <div className="form-group">
              <label>Blogwi subdomain</label>
              <div className="input-group">
                <input type="text" id="subdomain" value={state.form.subdomain} onChange={changes} className="form-control" placeholder="blogurl" />
                <div className="input-group-append">
                  <span className="input-group-text">.blogwi.com</span>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Custom domain</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <select value={state.form.scheme} className="form-control" onChange={changes}>
                    <option value="http://">http://</option>
                    <option value="https://">https://</option>
                  </select>
                </div>
                <input type="text" id="domain" value={state.form.domain} onChange={changes} className="form-control" placeholder="www.yourdomain.com" />
              </div>
              <p className="text-muted mt-2">
                Before start using custom domain, please add these CNAME records in your DNS management:
              </p>
              <table className="table table-bordered table-sm">
                <thead>
                  <tr className="text-muted">
                    <th>Name</th>
                    <th>Target</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>www</code></td>
                    <td><code>svr1.blogwi.org</code></td>
                  </tr>
                  <tr>
                    <td><code>{store.authuser.username}</code></td>
                    <td><code>dv.blogwi.org</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="btn btn-info">Submit</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default MyBlogSetting