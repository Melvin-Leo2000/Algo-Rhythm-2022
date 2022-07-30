import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Post from './technewspost'



export default function Companynews() {
    const [posts, setPosts] = useState([])
    const num_post = []
    useEffect(() => {
        axios.get('https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=technology&sort=LATEST&apikey=CSHWKA72N5ESQDHO')
        .then(res =>{
            setPosts(res.data)

        })
        .catch(err=>{
            console.log(err)
        })
    }, [])

    let post_titles = []
    for (var key in posts['feed']){
        if(parseInt(key) === 30) break;
        if (post_titles.includes(posts['feed'][key]['title'])){
          continue
        }

        
        post_titles.push(posts['feed'][key]['title'])
        num_post.push(posts['feed'][key])
        
    }


  return (
    <div className='com-news-block'>
    <div className='companynews'>
      {num_post.map((p) => (
        <Post post={p} />
      ))}
    </div>
    </div>
  )
}