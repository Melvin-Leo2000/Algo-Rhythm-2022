import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './companyfinancials.css'

export default function Companyfinancials(props) {
    const [posts, setPosts] = useState([])
    let stocksymbol = props.stockname.toUpperCase();

    useEffect(() => {
        axios.get('https://www.alphavantage.co/query?function=OVERVIEW&symbol='+ stocksymbol + '&apikey=pk_b7c82ed5552c4a38b44d5becea319347')
        .then(res =>{
            setPosts(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }, [stocksymbol])

    console.log(posts)
    let ebitda = parseInt(posts['EBITDA']) / 1000000000
    ebitda = ebitda.toFixed(3)
    let EPS = posts['EPS']
    let profitmargin = posts['ProfitMargin']
    let ROA = posts['ReturnOnAssetsTTM']
    let ROE = posts['ReturnOnEquityTTM']
    let revenue = parseInt(posts['RevenueTTM']) / 1000000000
    revenue = revenue.toFixed(3)
    let gp = parseInt(posts['GrossProfitTTM']) / 1000000000
    gp = gp.toFixed(3)
    let BETA = posts['Beta']
    let ptb = posts['PriceToBookRatio']




  return (
    <div>
        <table className='cd-financial-statement'>
    <thead>
        <tr>
        <th>Financial Statement</th>
        </tr>   
    </thead>
    <tbody>
        <tr>
        <td><b>EBITDA:</b> {ebitda}</td>
        </tr>
        <tr>
        <td><b>Earning Per Share:</b> {EPS}</td>
        </tr>
        <tr>
        <td><b>Gross Profit:</b> {gp}B</td>
        </tr>
        <tr>
        <td><b>Revenue:</b> {revenue}B</td>
        </tr>
        <tr>
        <td><b>Profit Margin:</b> {profitmargin}</td>
        </tr>
        <tr>
        <td><b>Return On Assets:</b> {ROA}</td>
        </tr>
        <tr>
        <td><b>Return on Equity:</b> {ROE}</td>
        </tr>
        <tr>
        <td><b>Price to Book Ratio:</b> {ptb}</td>
        </tr>
        <tr>
        <td><b>BETA:</b> {BETA}</td>
        </tr>

    </tbody>
    </table>
    </div>
  )
}
