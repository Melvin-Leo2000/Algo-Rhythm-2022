import React from 'react'
import "./specificpost.css"
import { Link } from "react-router-dom";


export default function Specificpost({_id, title, createdAt, photo, name}) {
  return (
    <Link to={`/post/${_id}`} className='post'>
          {photo && <img className="postImg" src={photo} alt="" />}
    <div className="postInfo">
      <span className="postDate">{new Date(createdAt).toDateString()} . {name}</span>
  </div>
      <span className="postTitle">
        <div>{title}</div>
      </span>
  </Link>
  )
}
