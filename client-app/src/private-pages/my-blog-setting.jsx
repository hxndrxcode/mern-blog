import React, { useContext, useEffect, useState } from "react";
import PageHeader from "../partials/page-header";
import { useParams } from "react-router-dom";
import { RootContext } from "../context/rootContext";
import axios from "axios";
import { handleApiError } from "../helper/Api";
import MyBlogMenu from "../partials/my-blog-menu";

const MyBlogSetting = props => {
  const { store, dispatch } = useContext(RootContext)
  document.title = 'Setting' + store.docTitle
  const { blogId } = useParams()
  const [state, setState] = useState({
    blogId,
    blogData: {},
    backupLogo: '',
    isLogoUploaded: false,
    update: 0
  })
  const [form, setForm] = useState({
    domain: '',
    subdomain: '',
    scheme: 'http://',
    title: '',
    tagline: '',
    logo: '',
    meta_tags: []
  })

  const fetchBlog = () => {
    axios.get(`${store.apiUrl}/myblog/${blogId}`, store.authHeader)
      .then(res => {
        setState({
          ...state,
          backupLogo: res.data.blog.logo,
          blogData: res.data.blog
        })
        setForm({
          ...form,
          ...res.data.blog
        })
      })
  }

  const changes = e => {
    form[e.target.id] = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({
      ...form,
      [e.target.id]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    })
  }

  const changeMeta = e => {
    let id = e.target.id.split('-')
    form.meta_tags[id[1]][id[0]] = e.target.value
    setForm(form)
  }

  const addMeta = e => {
    let meta_tags = form.meta_tags
    meta_tags.push({ name: '', content: '' })
    setForm({
      ...form,
      meta_tags
    })
  }

  const removeMeta = e => {
    let meta_tags = form.meta_tags
    meta_tags.splice(e.target.dataset.index, 1)
    setForm({
      ...form,
      meta_tags
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
        form.logo = 'https://img.vosy.net' + res.data.url
        setState({
          ...state,
          isLogoUploaded: true
        })
        setForm({
          ...form,
          logo: 'https://img.vosy.net' + res.data.url
        })
      })
  }

  const resetUpload = e => {
    setForm({
      ...state,
      isLogoUploaded: false
    })
    setForm({
      ...form,
      logo: state.backupLogo
    })
  }

  const submitForm = e => {
    e.preventDefault()
    axios.put(`${store.apiUrl}/myblog/${blogId}/${e.target.dataset.section}`, form, store.authHeader)
      .then(res => {
        setState({
          ...state,
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

  return !state.blogData.title ? '' : (
    <React.Fragment>
      <PageHeader title={state.blogData.title}>
        <MyBlogMenu blogId={blogId} path="setting" />
      </PageHeader>
      <h5>General</h5>
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={submitForm} data-section="general" className="col-md-8 offset-md-2 px-0">
            <div className="form-group">
              <label>Title</label>
              <input type="text" id="title" value={form.title} onChange={changes} className="form-control" />
            </div>
            <div className="form-group">
              <label>Tagline</label>
              <input type="text" id="tagline" value={form.tagline} onChange={changes} className="form-control" />
            </div>
            <div className="form-group">
              <label>Logo</label>
              <div className="d-flex">
                <img src={form.logo} alt="logo" className="mr-3" />
                <div className="w-100">
                  {state.isLogoUploaded ? (
                    <button type="button" onClick={resetUpload} className="btn btn-light btn-sm">Revert Logo</button>
                  ) : (
                    <input type="file" onChange={onUpload} id="file_logo" className="form-control" />
                  )}
                  <input type="text" id="logo" value={form.logo} onChange={changes} className="form-control d-none" />
                </div>
              </div>
            </div>
            <button className="btn btn-info">Submit</button>
          </form>
        </div>
      </div>
      <h5>Domain</h5>
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={submitForm} data-section="domain" className="col-md-8 offset-md-2 px-0">
            <div className="form-group">
              <label>Blogwi subdomain</label>
              <div className="input-group">
                <input type="text" id="subdomain" value={form.subdomain} onChange={changes} className="form-control" placeholder="blogurl" />
                <div className="input-group-append">
                  <span className="input-group-text">.blogwi.com</span>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Custom domain</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <select value={form.scheme} className="form-control" onChange={changes}>
                    <option value="http://">http://</option>
                    <option value="https://">https://</option>
                  </select>
                </div>
                <input type="text" id="domain" value={form.domain} onChange={changes} className="form-control" placeholder="www.yourdomain.com" />
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
                    <td><code>host.blogwi.org</code></td>
                  </tr>
                  <tr>
                    <td><code>user-{store.authuser.username}</code></td>
                    <td><code>dv.blogwi.org</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="btn btn-info">Submit</button>
          </form>
        </div>
      </div>
      <h5>Meta Tags</h5>
      <form onSubmit={submitForm} data-section="metatag">
        <ul className="list-group">
          {form.meta_tags.map((v, k) => {
            return (<li className="list-group-item" key={k}>
              <div className="col-md-8 offset-md-2 px-0">
                <div className="form-group">
                  <button onClick={removeMeta} data-index={k} type="button" className="btn btn-sm btn-light text-danger float-right mb-2">Remove</button>
                  <label>Meta tag #{k + 1}</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Name</span>
                    </div>
                    <input type="text" id={'name-' + k} value={v.name} onChange={changeMeta} className="form-control" />
                  </div>
                  <textarea id={'content-' + k} value={v.content} onChange={changeMeta} className="form-control mt-2" placeholder="content"></textarea>
                </div>
              </div>
            </li>)
          })}
          <li className="list-group-item text-center">
            <button onClick={addMeta} type="button" className="btn btn-sm btn-light text-success">Add</button>
          </li>
          <li className="list-group-item">
            <div className="col-md-8 offset-md-2 px-0">
              <button className="btn btn-info">Submit</button>
            </div>
          </li>
        </ul>
      </form>
    </React.Fragment>
  )
}

export default MyBlogSetting