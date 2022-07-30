import React from 'react';
import Plot from 'react-plotly.js';
import './charts.css'
import Financechart from './companyfinancials'

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
    }
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    const StockSymbol = this.props.stockname.toUpperCase();

    //Original Graph API Call
    let API_Call = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + StockSymbol + '&outputsize=full&apikey=56HRM54CT7DAHQDM'
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    //RSI indicator


    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {


          for (var key in data['Time Series (Daily)']) {
            stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['4. close']);
          }

          // console.log(stockChartXValuesFunction);
          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartYValues: stockChartYValuesFunction
          });
        }
      )


  }

  render() {
    const selectorOptions = {
      buttons: [{
          step: 'day',
          stepmode: 'backward',
          count: 1,
          label: '1d'
      },{
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
          label: 'Max'
      }],
  };
    return (
      <div>
        <h1 className="stock-title">{this.props.stockname.toUpperCase()} Historical Stock Price</h1>
        <div className='charts-plot'>
        <Plot 
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines',
              fill: 'tozeroy',
              marker: {color: 'red'},
              name: this.props.stockname.toUpperCase() + "'s closing price"
            }

          ]}
          layout={{width: 1200, height: 800, title: 'Stock Price since IPO', xaxis: { title: {text: 'Date', font: {family: 'Courier New, monospace', size: 18,color: '#7f7f7f'}},rangeselector: selectorOptions,
            rangeslider: {}, showspikes: true, spikemode: 'across+toaxis', spikesnap: 'cursor', showline: true,showgrid:true, spikedash: 'solid'}, yaxis: {title: {
          text: "Opening Price", font: { family: "Courier New, monospace", size: 18,color: "#7f7f7f"}}, fixedrange: true}, showlegend: true,
hovermode: 'x'}}
          config={{scrollZoom:true}}

        />
        <Financechart stockname= {this.props.stockname}></Financechart>
        </div>
        
      </div>
    )
  }
}

export default Stock;