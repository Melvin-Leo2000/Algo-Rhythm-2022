import React from 'react';
import Plot from 'react-plotly.js';
import Portfolio from './portfolio'


class RSI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rsixvalues: [],
      rsiyvalues: [],
      buyvalues: [],
      sellvalues: [],
      portfolio: [],
      returns: []
    }
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    const StockSymbol = this.props.stockname.toUpperCase();
    const buyingprice = this.props.buy
    const sellingprice = this.props.sell



    //RSI indicator
    let RSI_Call = 'https://www.alphavantage.co/query?function=RSI&symbol=' + StockSymbol + '&interval=daily&time_period=10&series_type=close&apikey=HKS0ESXWJMWNYD31'
    let closing = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+ StockSymbol + '&outputsize=full&apikey=Z440PYTWX6KP7FVU'
    let rsixvaluefunction = [];
    let rsiyvaluefunction = [];

    fetch(RSI_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          let sellprice = []
          let buyprice = []
          let Buy = true
          let Sell = false
          let dates = []
          console.log(data)

          for (var key in data['Technical Analysis: RSI']) {
            rsixvaluefunction.push(key);
            rsiyvaluefunction.push(data['Technical Analysis: RSI'][key]['RSI']);
            buyprice.push(buyingprice)
            sellprice.push(sellingprice)


            if (Buy){
              if (parseFloat(data['Technical Analysis: RSI'][key]['RSI']) < parseInt(buyingprice)){
                dates.push(['buy',key])
                Buy = false
                Sell = true
              }
            }

            else if (Sell){
              if (parseFloat(data['Technical Analysis: RSI'][key]['RSI']) > parseInt(sellingprice)){
                dates.push(['sell', key])
                Buy = true
                Sell = false
              }
            }


          }


          pointerToThis.setState({
            rsixvalues: rsixvaluefunction,
            rsiyvalues: rsiyvaluefunction,
            buyvalues: buyprice,
            sellvalues: sellprice,
            portfolio: dates
          });
        }
      )

      fetch(closing)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {


          let closing = []
          let win = []

          for (var key in data['Time Series (Daily)']){

              closing.push([key, data['Time Series (Daily)'][key]['4. close']])
          }
          pointerToThis.setState({
            returns: closing
          });
        }
      )

    
  }

  render() {
    const selectorOptions = {
        buttons: [{
            step: 'month',
            stepmode: 'backward',
            count: 1,
            label: '1m'
        }, {
            step: 'month',
            stepmode: 'backward',
            count: 6,
            label: '6m'
        }, {
            step: 'year',
            stepmode: 'todate',
            count: 1,
            label: 'YTD'
        }, {
            step: 'year',
            stepmode: 'backward',
            count: 1,
            label: '1y'
        }, {
            step: 'all',
        }],
    };
    return (
      <div>
      
        <Plot
          data={[
            {
              x: this.state.rsixvalues,
              y: this.state.rsiyvalues,
              type: 'scatter',
              mode: 'lines',
              name: 'RSI',
              fill: 'tozeroy',
              marker: {color: 'red'},
            },
            {
              x: this.state.rsixvalues,
              y: this.state.buyvalues,
              type: 'scatter',
              mode: 'lines',
              name: 'Buy',
              line: {color: 'black', width: 0.3},
            },
            {
              x: this.state.rsixvalues,
              y: this.state.sellvalues,
              type: 'scatter',
              mode: 'lines',
              name: 'Sell',
              line: {color: 'black', width: 0.3},
            }

          ]}
          layout={{width: 1200, height: 500, title: 'RSI Analysis', xaxis: { title: {text: 'Date', font: {family: 'Courier New, monospace', size: 18,color: '#7f7f7f'}},  rangeselector: selectorOptions,
            rangeslider: {}, showspikes: true, spikemode: 'across+toaxis', spikesnap: 'cursor', showline: true,showgrid:true, spikedash: 'solid'}, yaxis: {title: {
          text: "RSI Technical Analysis", font: { family: "Courier New, monospace", size: 18,color: "#7f7f7f"}}, fixedrange: true}, showlegend: true,
hovermode: 'x'}}
          config={{scrollZoom:true}}
        />

        <Portfolio stockdata = {this.state.returns} stockdates = {this.state.portfolio} stock = {this.props.stockname.toUpperCase()}></Portfolio> 
        
      </div>
    )
  }
}

export default RSI;