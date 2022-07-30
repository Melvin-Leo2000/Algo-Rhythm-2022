import React from 'react'
import './portfolio.css'


export default function Portfolio(props) {
    


    function buyprice(array){
        if (array[0] === 'buy'){
            return array
        }
        
    }
    let buydates = props.stockdates.map(buyprice)
    let Buydates = []
    for (var dates in buydates){
        if (Array.isArray(buydates[dates])){
            Buydates.push(buydates[dates])
        }
    }

    function sellprice(array){
        if (array[0] === 'sell'){
            return array
        }
        
    }
    
    let selldates = props.stockdates.map(sellprice)
    let Selldates = []
    for (var dates in selldates){
        if (Array.isArray(selldates[dates])){
            Selldates.push(selldates[dates])
        }
    }
    //take the bigger length
    let len = 0
    if (Selldates.length > Buydates.length){
        len = Buydates.length
    }
    else{
        len = Selldates.length
    }



    

    let sum  = 0
    let relative_profit = 0
    let closing = props.stockdata
    let buy = 0

    let sell = 0
    for (let i = 0; i < len; i++){
        for (let j = 0; j < closing.length; j++){
            if (closing[j][0] === Selldates[i][1]){
                sell = parseFloat(closing[j][1])
            }
            else if (closing[j][0] === Buydates[i][1]){
                buy =  parseFloat(closing[j][1])
            }
        }
        relative_profit = (sell - buy) / buy
        sum += relative_profit

    }

    let percent = 0
    percent = (sum / len) * 100
    percent = percent.toFixed(2)
  return (
    <div> 
    <div className='algorithm-generated'>
        The Algorithm was able to generate a <b className='algo-percentage'>{percent}%</b> profit since its IPO for {props.stock}
    </div>
    </div>
  )
}
