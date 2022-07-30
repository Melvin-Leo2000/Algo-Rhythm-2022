import React from 'react'
import logo from './logo.png';
import "./landing.css"
import Header from "../../header/Header"




export default function Landing() {
  return (
    <div>
    <div className='header-z'>
      <Header/>
    </div>
      <div className='rocket-color'>
    <img className='landing-banner' src='https://techcrunch.com/wp-content/uploads/2019/11/spacex-starlink-lift-off.gif?w=730&crop=1' alt=""/>
    <div class="landing-content">
        <h1>We're going to the moon</h1>
        <p>Trading has never been easier</p>
        <div>
        <a href='/register'><button type="button"><span></span>GET STARTED</button></a>

        </div>
        </div>
  </div>
    <div class="hero">
    <div class="right">
        <p class="title">Chart, Read and Analyse</p>
        <p class="subtitle">At Algo-Rhythm, join other traders and investors in making better, brighter decisions on the world markets,
        regardless if you're an advanced trader or a rookie.</p>                
    </div>
    <div class="left">
        <img src="https://miro.medium.com/max/1400/0*7ViVNTeQfJFGf8FH.gif" alt="test image"/>
    </div>
  </div>
  <div class="info">
            <h2 class="infotitle">Our Features</h2>
            <div class="infocards">
                <div class="card">
                    <img src="https://cdn.vox-cdn.com/thumbor/5QPOx1XwXVJklwj5LwcE04lGm8A=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23382328/VRG_Illo_STK022_K_Radtke_Musk_Twitter_Shrug.jpg" alt=""/>
                    <p class="desc">Catch the latest financial and tech news about the markets.</p>
                </div>
                <div class="card">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh8BLN016Fj35XqgIY9da6IhGMaOiQ7kW5WA&usqp=CAU" alt=""/>
                    <p class="desc">Technical Analysis and portfolio analysis at your finger tips.</p>
                </div>
                <div class="card">
                    <img src="https://img.freepik.com/premium-vector/people-table-talking-icon-isolated-white-background-vector-illustration_230920-1347.jpg?w=2000" alt=""/>
                    <p class="desc">See and watch what other traders are talking about in the markets.</p>
                </div>
                <div class="card">
                    <img src="https://i.pinimg.com/originals/c3/52/c6/c352c6d120002928a7554aff41b92890.jpg" alt=""/>
                    <p class="desc">Get real time updates on stock and share prices.</p>
                </div>
            </div>
        </div>
        
        <div class='backtesting-landing'>
        <section class="carbon dark">
        <div class="content-main">
          <h2>Make better Investment and trading decisions</h2>
          <p>Backtest your own stock trading strategies and check the viability of your trading strategies without any risk. Trades are conducted according to the historical market conditions and calculate the total return of the portfolio.
</p>
        </div>
      </section>
      </div>


      <section class="testimonial">
        <div >
            <blockquote>
                &ldquo; The best way to measure your investing success is not by whether you're beating the market but by whether you've put in place a financial plan and a behavioral discipline that are likely to get you where you want to go. &rdquo;
                <cite>&mdash; Benjamin Graham</cite>
            </blockquote>
        </div>
    </section>


        <footer className='footer'>
        <ul>
            <p>© Orbital 2022 Team Algo-Rhythm, ID 5432, Brandon Lau and Melvin Leo.</p>
            <br></br>
            <p>Project's repository and acknowledgments can be found here</p>
        </ul>
        </footer>

</div>
  )
}
