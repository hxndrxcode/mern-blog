import axios from 'axios'
import React, {  } from 'react'
import * as Icon from "react-feather"

const Editor = (props) => {
  // const [val, setVal] = useState(props.value)
  const btnToolbar = (btn, i) => {
    let input = document.querySelector('.editor')

    let syntax = {
      bold: { prev: '**', next: '**' },
      italic: { prev: '_', next: '_' },
      code: { prev: '`', next: '`' },
      blockcode: { prev: '```\n', next: '\n```' },
      link: { prev: '[klik disini](', next: ')' },
      image: { prev: '![gambar](', next: ')' }
    }
    let h = 'https://'
    let val = input.value
    let cursorA = input.selectionStart
    let cursorB = input.selectionEnd
    let b = val.substring(0, cursorA)
    let c = val.substring(cursorA, cursorB)
    if (i) {
      c = i
    }
    let a = val.substring(cursorB, cursorA.length)
    let bc = val.substr(cursorA - 1, 1)
    if (bc === '\n' && btn === 'code') {
      btn = 'blockcode'
    }
    let sp = syntax[btn].prev
    let sn = syntax[btn].next
    if (c.length === 0 && btn === 'link') {
      sp += h
    }
    if (bc !== '\n' && btn === 'image') {
      sp = '\n' + sp
    }
    let nbc = b + sp + c
    let nc = nbc.length
    if (c.length > 0) {
      nc = (nbc + sn).length
    }
    input.value = nbc + sn + a
    input.selectionStart = nc
    input.selectionEnd = nc
    input.focus()
  }

  const btnBrowseImage = e => {
    document.getElementById('upload-image-editor').click()
  }

  const btnPreview = e => {

  }

  const uploadImage = e => {
    const inputFile = document.getElementById('upload-image-editor')
    const file = inputFile.files[0]
    if (!file) return
    let form = new FormData()
    form.append('image', file)
    form.append('width', 300)
    const loadingEL = document.getElementById('upload-loading')
    loadingEL.style.display = 'unset'
    axios({
      url: 'https://img.vosy.net/upload/file',
      method: 'post',
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
        btnToolbar('image', res.data.url)
        inputFile.value = null
    })
    .then(() => {
        loadingEL.style.display = 'none'
    })
  }

  return (
    <React.Fragment>
      <div className="d-flex bg-light p-2 border">
        <button type="button" onClick={() => { btnToolbar('bold') }} data-action="" className="btn btn-sm btn-light px-1 px-md-2">
          <Icon.Bold />
        </button>
        <button type="button" onClick={() => { btnToolbar('italic') }} data-action="" className="btn btn-sm btn-light px-1 px-md-2">
          <Icon.Italic />
        </button>
        <button type="button" onClick={() => { btnToolbar('code') }} data-action="" className="btn btn-sm btn-light px-1 px-md-2" >
          <Icon.Code />
        </button >
        <button type="button" onClick={() => { btnToolbar('link') }} data-action="" className="btn btn-sm btn-light px-1 px-md-2" >
          <Icon.Link />
        </button >
        <button type="button" onClick={btnBrowseImage} className="btn btn-sm btn-light px-1 px-md-2" >
          <Icon.Image />
        </button >
        <button type="button" onClick={btnPreview} className="btn btn-sm btn-light px-1 px-md-2 ml-auto" >
          Preview
        </button >
      </div>
      <div id="upload-loading" className="text-danger" style={{ display: "none" }}>Sedang mengupload...</div>
      <input onChange={uploadImage} type="file" id="upload-image-editor" className="d-none" />
      <textarea className="form-control editor" id={props.formid} value={props.value} onChange={props.changes} rows="10" placeholder="Post body"></textarea>
    </React.Fragment>
  )
}

export default Editor