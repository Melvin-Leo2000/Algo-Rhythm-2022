import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './companydescription.css'
import Tracker from '../tickers/tracker'

export default function Companydescription(props) {
    const [posts, setPosts] = useState([])
    //const [pic, setPic] = useState(null)
    const [descript, setdescript] = useState([])

    let stocksymbol = props.stockname.toUpperCase();
    const stonk = 'https://storage.googleapis.com/iex/api/logos/' + stocksymbol + '.png'
    //get company basic information 
    useEffect(() => {
        axios.get('https://www.alphavantage.co/query?function=OVERVIEW&symbol='+ stocksymbol + '&apikey=BK1JG1K4C2CN20K5')
        .then(res =>{
            setPosts(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }, [stocksymbol])

    useEffect(() => {
        axios.get('https://cloud.iexapis.com/v1/stock/'+ stocksymbol + '/company?token=pk_b7c82ed5552c4a38b44d5becea319347')
        .then(res =>{
            setdescript(res.data)


        })
        .catch(err=>{
            console.log(err)
        })
    }, [stocksymbol])



    

    let stock_name = posts['Name']
    let stock_desc = descript['description']
    let ceo = descript['CEO']
    let exchange = posts['Exchange']
    let sector = posts['Sector']
    let mktcap = parseInt(posts["MarketCapitalization"]) / 1000000000
    mktcap = mktcap.toFixed(3)
    let dy = parseFloat(posts['DividendYield']) * 100
    let weekhigh = posts['52WeekHigh']
    let weeklow = posts['52WeekLow']
    let dvdpershare = posts['DividendPerShare']
    let PE = posts['PERatio']
    let dvdyield = posts['DividendYield']
    let industry = descript['industry']
    let website = 'https://' + descript['website']
    let address = posts['Address']
    let Employees = descript['employees']

    if (dy === 0){
        dy = '-'
    }
 

  return (
    <div>
    <img className='cd-stonks-img' src= {stonk} alt="no-logo" />
    <div className='cd-stonk-symbols'>
        <div className='cd-stockgroup'>

            <b className='cd-stonkname'>{stock_name} ({props.stockname.toUpperCase()})</b>
        </div>
        <div className = 'cd-exchange'>
        {exchange}
        </div>
        <div className='cd-tracker'>
        <Tracker  name={props.stockname} ></Tracker>
        </div>
    </div>
    
<table className='cd-content-table'>
    <thead>
        <tr>
        <th>Profile</th>
        <th>Financials</th>
        </tr>
        
    </thead>
    <tbody>
        <tr>
        <td><b>Sector:</b> {sector}</td>
        <td><b>Market Capitalisation:</b> {mktcap}B</td>
        </tr>
        <tr>
        <td><b>Industry:</b> {industry}</td>
        <td><b>P/E Ratio:</b> {PE}</td>
        </tr>
        <tr>
        <td><b>Address:</b> {address}</td>
        <td><b>Dividend Yield:</b> {dvdyield}</td>
        </tr>
        <tr>
        <td><b>Employees:</b> {Employees}</td>
        <td><b>Dividend Per Share:</b> {dvdpershare}</td>
        </tr>
        <tr>
        <td><b>CEO:</b> {ceo}</td>
        <td><b>52 week high:</b> {weekhigh}</td>
        </tr>
        <tr>
        <td><b>Website:</b> <a target="_blank" href={website}>{website}</a></td>
        <td><b>52 week low:</b> {weeklow}</td>
        </tr>
    </tbody>
    </table>

    <table className='cd-content-table'>
    <thead>
        <tr>
        <th>Company Description</th>
        </tr>
    </thead>
        <div className='cd-stockdesc'>
             {stock_desc}
        </div>
    </table>
    
    </div>
  )
}
