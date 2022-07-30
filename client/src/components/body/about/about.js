import React from 'react'
import about_img from '../../images/standing_mountain.jpg'
import './about.css'
import firstpic from '../../images/what-to-consider.png'
import data from "../../images/trading_graph.png"
import stock from "../../images/tesla_stock.jpg"
import Header from '../../header/Header'


export default function about() {
  return (
    <div>
    <div className='about-body'>
    <div className='header-z'>
      <Header/>
    </div>
    <div class="we-are-block">


  <div id="history-section">

    <div class="history-image">

      <img src="https://photos.smugmug.com/Launch-Photo-Guide-2/i-CdVkZtw/2/70e767ea/L/WScriptunas-9603-L.jpg" width="951" height="471" alt="Building Pic"/>

    </div>

    <div class="history-info">

      <h2>The Team</h2>

      <p>Algo-Rhythm was built for Orbital (Independent Software Engineering project CP2106 in the summer of 2022) as a introduction to software development, project management and collaborative programming.</p>
      <p>As students from Business Analytics and Data Analytics respectively, we decided to build a project that allows us to dive deeper in Data Analysis and working with stock data through the use of APIs and javascript's chart libraries. Our software documentation and workflow can be found <a target="_blank" class='documentation' href='https://docs.google.com/document/d/15At1BXNi3Q-vbjuvrX-TfSr8wWIrDjV80--jb7ApWcs/edit?usp=sharing'>here.</a></p>

    </div>

  </div>

  <div id="about-us-section">

<div class="about-us-image">

  <img src="https://media.istockphoto.com/photos/the-nasdaq-building-on-times-square-in-new-york-usa-picture-id621572464?k=20&m=621572464&s=170667a&w=0&h=4nWO0ToGj5KHPOkrh7Ur5rqRSgp_zyUj0Yt4imp6dN0=" width="808" height="458" alt="Lobby Image"/>

</div>

<div class="about-us-info">

  <h2>Algo-Rhythm's Vision</h2>

  <p>As novice traders and aspiring retail investors interested in pursuing a career in finance, we can emphathize we people in similar circumstances who are unsure of where to start. Therefore, we created Algo-Rhythm in hopes to create a simplified backtesting algorithm for novice retail investors like ourselves to try out their own strategies and help further level the playing field between institutional investors and wall street.</p>
  <p><b>Our vision is to help traders to come up with better trading ideas, foster a sense of community amongst traders and make valuable trading strategies and insights accessible to all.</b></p>

</div>

</div>

</div>

    </div>
    </div>
  )
}
