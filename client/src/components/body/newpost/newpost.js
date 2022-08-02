import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import "./newpost.css"
import axios from "axios";
import {showSuccessMsg, showErrMsg} from '../../utils/notification/Notification'
import Header from "../../header/Header"

export default function Newpost() {
  const initialState = {
    err: '',
    success: ''
}

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const auth = useSelector(state => state.auth)
  const [data, setData] = useState(initialState)
  const {err, success} = data

  const {user} = auth
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      name: user.name,
      title,
      desc,
    };
    if(!file) return setData({...data, err: "No files were uploaded!" , success: ''})
    
    if(file.type !== 'image/jpeg' && file.type !== 'image/png')
    return setData({...data, err: "File format is incorrect." , success: ''})

    if(!title.trim()) return setData({...data, err: "You forgot your title!" , success: ''})

    if(!desc.trim()) return setData({...data, err: "Please share some inputs!" , success: ''})

    if(desc.length > 100) return setData({...data, err: "Word length is too long!" , success: ''})

    if (file) {
      if(file.size > 1024 * 1024)
        return setData({...data, err: "Size too large." , success: ''})

      if(file.type !== 'image/jpeg' && file.type !== 'image/png')
        return setData({...data, err: "File format is incorrect." , success: ''})

      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      console.log(data)
      
      try {
        const response = await axios.post("/upload/upload_image", data, {
          headers: {'content-type': 'multipart/form-data'}
      });

      newPost.photo = response.data.url

      } catch (err) {
        setData({...data, err: err.response.data.msg , success: ''})
      }
    }
    try {
      const res = await axios.post("/posts/news", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      setData({...data, err: err.response.data.msg , success: ''})
    }
  };

  return (
  <div>
  <Header></Header>
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <div className='newpost-error'>
    {err && showErrMsg(err)}
    {success && showSuccessMsg(success)}
    </div>
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"><img src='https://static.thenounproject.com/png/2192072-200.png'/></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Share your thoughts about the market in a 100 words..."
            type="text"
            className="writeText"
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
          <button className="writeSubmit" type="submit">
          PUBLISH
        </button>
        </div>
      </form>
    </div>
  </div>
  )
}
