import React ,{ useContext, useEffect, useState } from 'react'
import "./post.css"
import {useSelector} from 'react-redux'

import axios from "axios";
import { useLocation } from "react-router";

import Header from "../../header/Header"


export default function Singlepost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const auth = useSelector(state => state.auth)
  const {user} = auth

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
    };
    getPost();
  }, [path]);


  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { name: user.name },
      });
      window.location.replace("/main");
    } catch (err) {}
  };

  return (
    <div>
    <Header />
      <div className='singlePost'>
        <div className='singlePostWrapper'>
        {post.photo && (
          <img src={post.photo} alt="" className="singlePostImg" />
        )}
        <div className="singlePostTitle">{post.title}</div>
        <span className="singlePostDate">
            Published: {new Date(post.createdAt).toDateString()}
        </span>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author: <b>{post.name}</b>
          </span>
        </div>

        <p className="singlePostDesc">{post.desc}</p>
        <div className='delete-button'>
        {post.name === user?.name && (
        <button className="singlePostButton" onClick={handleDelete}>DELETE POST</button>                
        )}
        </div>
        </div>
      </div>
    </div>
    )
}
