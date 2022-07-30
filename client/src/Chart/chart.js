import React, {useState} from 'react';
import Stock from './charts';
import RSI from './rsi';
import './chart.css'
import Header from '../../src/components/header/Header'
import Stocknews from '../Chart/companynews'
import Desc from '../Chart/companydescription'
import {showErrMsg} from '../components/utils/notification/Notification'
import Macdmap from './macdmap'
import Livechart from './companycurrent'
import './moving.scss'


function Chart() {
  
  const [stonk, setStonk] = useState('')
  const [print, setPrint] = useState(false)
  const [macd, setmacd] = useState(false)
  const [startdate, setstartDate] = useState('')
  const [enddate, setendDate] = useState('')
  const [buy, setBuy] = useState('')
  const [sell, setSell] = useState('')
  const [rsi, setrsi] = useState(false)

  const [err, setError] = useState('')
  const [err2, setErr2] = useState('')




  

  
  const macdSubmit = (e) => {
    e.preventDefault();

    if (!enddate || !startdate){
      setError('Please input both start date and end date')
      return
    }
    if (enddate < startdate){
      setError('Start Date cannot be later than end date')
      return 
    }

    if (parseInt(new Date(enddate).getDay()) === 6 || parseInt(new Date(enddate).getDay()) === 0 || parseInt(new Date(startdate).getDay()) === 6 || parseInt(new Date(startdate).getDay()) === 0){
      setError('Stock Markets are not opened on the weekend.')
      return
    }


    setError('')
    setmacd(true)
  }

  const macdreSubmit = (e) => {
    e.preventDefault();
    setmacd(false)
  }

  const rsidreSubmit = (e) => {
    e.preventDefault();
    setrsi(false)
  }

  
  
  const userLink = () => {
    return <div>
    <div class='scroll-body'>
    <div class="scrolling-words-container">
  <span>Search for </span>
  <div class="scrolling-words-box">
    <ul>
      <li class='stock-scroll'>Stock Tickers</li>
      <li class='news-scroll'>Trending News</li>
      <li class='tech-scroll'>Technical Analysis</li>
      <li class='com-scroll'>Company Profile</li>
      <li class='stock-scroll'>Stock Tickers</li>
    </ul>
  </div>
</div>
</div>
    <form class='search-container' onSubmit={HandleSubmit}>
    <div class="search-box">
      <input type="text" class="search-input" placeholder="Eg. TSLA"  value={stonk} onChange={(e) => setStonk(e.target.value)} required/>

      <button class="search-button">
        <i class="search-emoticon"><img class='search-emoticon-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM52Oe0Jm_tYAOj3OmCysuXypVFc3cR53MoM8U_NdsvM-p7OGLJiVRkvZBLnKjb4DRddc&usqp=CAU'/></i>
      </button>
   </div>
   </form>  
  </div>  
    }
    const macdinput = () => {
      return <div>
                <table className='portfolio-table'>
                  <thead>
                      <tr>
                      <th>FAQ</th>
                      </tr>
                  </thead>
                  <div>When you select the MACD option, the trades will be conducted using the 9 day Exponential Moving Average (EMA) of the MACD value as its signal line to buy during bullish crossovers and sell during bearish crossovers. Afterwards, select the timeframe you would like to simulate the portfolio through and click Submit.The return of the portfolio using your given trading strategy will be shown.</div>
                </table>
              <form  onSubmit={macdSubmit}>
              {
                !macd?
                      <div class='booking-form'>
                      <div class="col-md-6">
                                <div class="form-group"> <input class="form-control" type="date" onChange={(e) => setstartDate(e.target.value)} required/> <span class="form-label">START DATE</span> </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group"> <input class="form-control" type="date" onChange={(e) => setendDate(e.target.value)} required/> <span class="form-label">END DATE</span> </div>
                            </div>
                      </div>
                :null
              }
               <div className='stock-form-macd'>
               {
                !macd?
                <button className='macdinput-button' type="submit">Analyse</button>
                :null
                }
               </div>
              </form>
              {err && showErrMsg(err)}
      </div>
  
      }

      const macdresubmitinput = () => {
        return <div>
                <form className="macdoutput" onSubmit={macdreSubmit}>
                 <button className='macdoutput-button' type="submit">New MACD Analysis</button>
                </form>

        </div>
    
        }

      const rsiSubmit = (e) => {
        e.preventDefault();
        let buyprice = Number(buy)
        let sellprice = Number(sell)

        if (!buyprice || !sellprice){
          setErr2('Please field in all fields!')
          return
        }
        
        if (isNaN(buyprice)){
          setErr2('Invalid buy price')
          return
        }
        

        if (isNaN(sellprice)){
          setErr2('Invalid sell price')
          return
        }


        if (buy > sell){
          setErr2('Buy price cannot be higher than sell price!')
          return 
        }

        if (buy > 100){
          setErr2('Buy Value cannot be higher than 100')
          return 
        }

        if (sell > 100){
          setErr2('Sell Value cannot be higher than 100')
          return 
        }
        if (sell < 0 || buy < 0){
          setErr2('Values cannot be negative')
          return 
        }
        setErr2('')
        setrsi(true)
    
      }

      const rsiinput = () => {
        return <div>
                <table className='portfolio-table'>
                  <thead>
                      <tr>
                      <th>FAQ</th>
                      </tr>
                  </thead>
                  <div>When you select the RSI option, simply key in the buy and sell thresholds for the stock using its RSI readings (from 0-100) ensuring that the buy threshold is lower than the sell threshold and click submit. The trades will be conducted according to the chosen limits. The return of the portfolio using your given trading strategy will be shown. 
                  <b>*Note that the sell and buy price are around 30 and 70, but users have the autonomy to key in their desired pricing for their own portfolio analysis. If the buy price is too low, it may not generate any profit and it will just return NaN.</b></div>
                </table>
              <form className='rsi-input' onSubmit={rsiSubmit}>
                <label>
                <input  type="text" placeholder='Buy' value ={buy} onChange={(e) => setBuy(e.target.value)} />
                </label>
                <label>
                <input className='chart-selloutput' type="text"  placeholder='Sell' value ={sell} onChange={(e) => setSell(e.target.value)} />
                </label>
                
                <div>
                {
                !rsi?
                <button  type="submit">Analyse</button>
                :null
                }
                </div>
              </form>
                
              {err2 && showErrMsg(err2)}
        </div>
    
        }

        const rsiresubmitinput = () => {
          return <div>
                  <form className="rsi-submit-input" onSubmit={rsidreSubmit}>
                  <div className='rsiresubmitinput-button'>
                   <button type="submit">New RSI Analysis</button>
                  </div>
                  </form>
  
          </div>
      
          }
      
  const HandleSubmit = (e) => {
    e.preventDefault();

    setPrint(true)

  }

  const handlereSubmit = (e) => {
    e.preventDefault();
    setmacd(false)
    setrsi(false)

    setPrint(false)
  }
  return (
    <div className="App">
    <div className='header-z'>
      <Header/>
    </div>
      <div className='stockprice'>
                {
                  !print?
                  userLink()
                  :null
                }
      <form onSubmit={handlereSubmit}>
      {
      print?
        <button className="after-button" type="submit">Search Another Stock</button>
      :null
      }
      </form>
      
      {
       print?
            <Desc stockname={stonk}></Desc>

       :null
      }
      {
       print?
            <Livechart  stonk={stonk}></Livechart>

       :null
     }
      {
       print?
            <Stock stockname= {stonk} ></Stock> 

       :null
     }
     {
     print?
     <div className='RSI-name'>Relative Strength Index Analysis</div>
       :null
     }
     {
       rsi?
            <RSI buy={buy} sell={sell} stockname= {stonk} ></RSI>

       :null
     }
     {
       print?
        rsiinput()
       :null
     }
     {
       rsi?         
        rsiresubmitinput()
       :null
     }
     {
     print?
     <div className='RSI-name'>Moving Average Convergence Divergence</div>
       :null
     }
     {
      macd?
            <Macdmap startdate = {startdate} enddate = {enddate} stockname= {stonk}></Macdmap>
       :null
     }
     {
       print?
        macdinput()
       :null
     }
     {
      macd?
        macdresubmitinput()
       :null
     }


     {
       print?
            <Stocknews stockname= {stonk}></Stocknews>
       :null
     }
      </div>
      
    </div>
  );
}

export default Chart;





