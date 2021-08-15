import React, { useContext, useEffect } from "react";
import { RootContext } from "../context/rootContext";
import PageHeader from "../partials/page-header";
import { useState } from "react";
import axios from "axios";
import { Api, handleApiError } from "../helper/Api";
import MyAccountMenu from "../partials/my-account-menu";

const EditProfile = () => {
  const { store, dispatch } = useContext(RootContext)
  document.title = 'Edit Profile' + store.docTitle
  const [state, setState] = useState({
    form: {
      fullname: '',
      photo: '',
      bio: ''
    },
    isDone: false,
    backupImage: '',
    isImageUploaded: false,
    update: 0
  })

  const fetchProfile = () => {
    Api.get('profile', store.authHeader)
      .then(res => {
        const { fullname, photo, bio } = res.data.data
        setState({
          ...state,
          form: {
            fullname,
            photo,
            bio
          }
        })
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

  const changes = e => {
    setState({
      ...state,
      form: {
        ...state.form,
        [e.target.id]: e.target.value
      }
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

    Api.post('misc/upload', formData, option)
      .then(res => {
        e.target.files = null
        let form = state.form
        form.photo = res.data.url
        setState({
          ...state,
          form,
          isImageUploaded: true,
          backupImage: form.photo
        })
      })
  }

  const resetUpload = e => {
    let form = state.form
    form.photo = state.backupImage
    setState({
      ...state,
      form,
      isImageUploaded: false
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    axios.put(store.apiUrl + '/profile', state.form, store.authHeader)
      .then(res => {
        setState({
          ...state,
          update: Date.now(),
          isImageUploaded: false
        })
      })
      .catch(e => handleApiError(e, store, dispatch))
  }

  useEffect(() => {
    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.update])

  return (
    <React.Fragment>
      <PageHeader title={store.authuser.username}>
        <MyAccountMenu path="edit" />
      </PageHeader>
      <div className="card">
        <div className="card-body">
          <form onSubmit={onSubmit} className="col-md-8 offset-md-2 px-0">
            <div className="form-group">
              <label htmlFor="fullname">Fullname</label>
              <input type="text" id="fullname" onChange={changes} value={state.form.fullname} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="photo">Photo Profile</label>
              <div className="d-flex">
                <img src={state.form.photo} alt="" className="mr-3" />
                <div className="w-100">
                  {state.isImageUploaded ? (
                    <button type="button" onClick={resetUpload} className="btn btn-light btn-sm">Revert Logo</button>
                  ) : (
                    <input type="file" onChange={onUpload} id="file_photo" className="form-control" />
                  )}
                  <input type="text" id="photo" value={state.form.photo} onChange={changes} className="form-control d-none" />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea id="bio" onChange={changes} value={state.form.bio} className="form-control" rows="5"></textarea>
            </div>
            <button className="btn btn-info">Update</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
export default EditProfile;