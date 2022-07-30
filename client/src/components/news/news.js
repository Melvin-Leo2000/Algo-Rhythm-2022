import React, { useEffect, useState } from 'react'
import Post from "../../components/body/specificpost/specificpost"
import "./news.css"
import axios from "axios";


export default function News() {
  const [posts, setPosts] = useState([]);



useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts");
      setPosts(res.data)

    };
    fetchPosts();
  }, []);

  console.log(posts)

  

  return (
    <div >
        {posts?.map(p => {
          return(
          <Post
             _id={p._id}
             title={p.title}
             photo={p.photo}
             name={p.name}
             createdAt={p.createdAt}  

             />
          )
        })}
    </div>
  )
}
