import React from 'react'
import './singlepost.css'
import logo from '../components/images/logo.png'

export default function Singlepost({post}) {

  let date = post.time_published
  let year = date.slice(0, 4);
  let month = date.slice(4, 6);
  let day = date.slice(6, 8);
  let final_date = ''
  final_date = day + '-' + month + '-' + year
  return (
        <div>
        <a target="_blank" href={post.url} className='tech-news-section'>
            {<img className="postImg" src={post.banner_image} alt="logo" />}
            <div className="postInfo">
            <span className="tech-post-date">{final_date} .  {post.authors}</span>
            <span className="main-tech-news">
                <h3>{post.title}</h3>
            </span>
            <p className='tech-post-source'>
            Source: {post.source}
            </p>
            </div>
        </a>
        </div>
  )
}
