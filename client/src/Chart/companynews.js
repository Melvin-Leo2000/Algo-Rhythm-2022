import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Post from '../Chart/singlepost'
import './companynews.css'


export default function Companynews(props) {
    const [posts, setPosts] = useState([])
    const num_post = []
    let stocksymbol = props.stockname.toUpperCase();
    useEffect(() => {
        axios.get('https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=' + stocksymbol + '&sort=RELEVANCE&apikey=CSHWKA72N5ESQDHO')
        .then(res =>{
            setPosts(res.data)

        })
        .catch(err=>{
            console.log(err)
        })
    }, [])
    let i = 0;
    let post_titles = []
    for (var key in posts['feed']){
        if(parseInt(key) === 20) break;
        if (post_titles.includes(posts['feed'][key]['title'])){
          continue
        }

        
        post_titles.push(posts['feed'][key]['title'])
        num_post.push(posts['feed'][key])
        
    }


  return (
    <div className='com-news-block'>
    <h1>Check out more news about {props.stockname.toUpperCase()}: </h1>
    <div className='companynews'>
      {num_post.map((p) => (
        <Post post={p} />
      ))}
    </div>
    </div>
  )
}
