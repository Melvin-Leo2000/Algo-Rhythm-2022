import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Plot from 'react-plotly.js';
import './macdmap.css'

export default function Macdmap(props) {
    const [tposts, settPosts] = useState([])
    const [tsposts, settsPosts] = useState([])
    let StockSymbol = props.stockname.toUpperCase()
    const [clse, setclse] = useState([])

    useEffect(() => {
        axios.get('https://www.alphavantage.co/query?function=EMA&symbol=' + StockSymbol + '&interval=daily&time_period=12&series_type=open&apikey=BK1JG1K4C2CN20K5')
        .then(res =>{
            settPosts(res.data)

        })
        .catch(err=>{
            console.log(err)
        })
    }, [StockSymbol])

    useEffect(() => {
        axios.get('https://www.alphavantage.co/query?function=EMA&symbol=' + StockSymbol + '&interval=daily&time_period=26&series_type=open&apikey=2AQ2BDFVJN2I9NGK')
        .then(res =>{
            settsPosts(res.data)

        })
        .catch(err=>{
            console.log(err)
        })
    }, [StockSymbol])

    //calculating the close 
    useEffect(() => {
      axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+ StockSymbol + '&outputsize=full&apikey=7XEWPS9HVSMW5BXB')
      .then(res =>{
          setclse(res.data)

      })
      .catch(err=>{
          console.log(err)
      })
  }, [StockSymbol])

    let date = []
    let macd12 = []
    let macd26 = []
    let begin = props.startdate
    let end = props.enddate

    // calculating the EMA for both 12 periods and 26 periods 
    for (var key in tposts['Technical Analysis: EMA']) {
        let flip = false; 
        if (key < end){
            flip = true;
        }
        
        if (flip === true){
            date.push(key)
            macd12.push(tposts['Technical Analysis: EMA'][key]['EMA'])
        }

        if (key < begin) break;
      }

    for (var key in tsposts['Technical Analysis: EMA']) {
        let flip = false; 
        if (key < end){
            flip = true;
        }
        if (flip === true){
        macd26.push(tsposts['Technical Analysis: EMA'][key]['EMA'])
      }
      
      if (key < begin) break;

    }


    // calculating the macdvalue
    let macdvalue = []
    let value = 0
    let date_value = []
    for(let i = 0; i < macd26.length; i++ ){
        value = parseFloat(macd12[i]) - parseFloat(macd26[i])
        macdvalue.push(value)
        date_value.push([date[i], value])
      }

    //calculates the sma of the entire day
  let macdsma = []
  for (let i = 0; i < macdvalue.length;i++) {
    let total = 0
    for (let j = 0 ; j < 9;j++) {
      total += macdvalue[j+i]
  }
    macdsma.push(total/9)
  }
  //signal line 
  let weightedmultiplier = 2 / 10
  let macdema = []
  macdema.push(macdsma[0])
  for (let i = 1; i < macdvalue.length;i++) {
    macdema.push(macdvalue[i] * weightedmultiplier + macdema[macdema.length-1]*(1-weightedmultiplier))
  }
  let hist = []
  let sum = 0
  // values for histograms
  for(let i = 0; i < macdvalue.length; i++ ){
    sum = macdvalue[i] - macdema[i]
    hist.push(sum)
  }

  //calculating algorhythm for macd earnings

  let buydate = []
  let selldate = []
  let looking_for_buy = true
  for (var i = 0; i <  macdvalue.length; i++){
    if (looking_for_buy){
      if (macdvalue[i] > macdema[i]){
        for (var j = 0; j < date_value.length; j++){
          if (macdvalue[i] === date_value[j][1]){
            buydate.push(date_value[j][0])
            looking_for_buy = false
            break
          }

        }
      }

    }

      else{
        if (macdvalue[i] < macdema[i]){
          for (var j = 0; j < date_value.length; j++){
            if (macdvalue[i] === date_value[j][1]){
              selldate.push(date_value[j][0])
              looking_for_buy = true
              break
            }

        }
      }
    }

  }
  // adding and taking note of the values
  let len = 0
  if (buydate.length > selldate.length){
    len = selldate.length
  }
  else{
    len = buydate.length
  }

  //getting closing price and calcaluting the algorithm

  let buysum = []
  let sellsum = []
  let closingprice = []
  for (var dates in clse["Time Series (Daily)"]){
    closingprice.push([dates, parseFloat(clse['Time Series (Daily)'][dates]['4. close'])])
  }

  for (var i = 0; i < len; i++){
    for (var j = 0; j < closingprice.length; j++){
      if (closingprice[j][0] === buydate[i]){
        buysum.push(closingprice[j][1])
      }

      if (closingprice[j][0] === selldate[i]){
        sellsum.push(closingprice[j][1])
      }
    }
  }

  let total = 0
  let profit = 0

  for (var i=0; i < sellsum.length; i++){
    profit = (sellsum[i] - buysum[i]) / buysum[i]
    total += profit
  }

  let percent = 0
  percent = (total / sellsum.length) * 100
  percent = percent.toFixed(2)
  return (
    <div>
        <Plot
          data={[
            {
              x: date,
              y: macdvalue,
              type: 'scatter',
              mode: 'lines',
              name:'MACD Line',
              marker: {color: 'red'},
            },
            {
              x: date,
              y: macdema,
              type: 'scatter',
              mode: 'lines',
              name: 'Signal Line',
              marker: {color: 'blue'},
            }
          ]}
          layout={{width: 1200, height: 800, title: 'MACD Analysis', xaxis: { title: {text: 'Date', font: {family: 'Courier New, monospace', size: 18,color: '#7f7f7f'}},
            rangeslider: {}, showspikes: true, spikemode: 'across+toaxis', spikesnap: 'cursor', showline: true,showgrid:true, spikedash: 'solid'}, yaxis: {title: {
          text: "MACD values", font: { family: "Courier New, monospace", size: 18,color: "#7f7f7f"}}, fixedrange: true}, showlegend: true, hovermode: 'x'}}
          config={{scrollZoom:true}}
        />

      <div className='algorithm-generated'>The Algorithm was able to generate a <b className='algo-percentage'>{percent}%</b> profit from {props.startdate} to {props.enddate} for {props.stockname.toUpperCase()}</div>
    </div>
  )
}
