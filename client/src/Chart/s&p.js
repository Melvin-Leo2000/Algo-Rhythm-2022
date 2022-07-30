import { useEffect, useState, useMemo } from 'react';
import Chart from 'react-apexcharts';
import './s&p.css'


const round = (number) => {
  return number ? +(number.toFixed(2)) : null;
};
const stonksUrl = 'https://yahoo-finance-api.vercel.app/%5EGSPC';
async function getStonks() {
  const response = await fetch(stonksUrl);
  return response.json();
}

const chart = {
  options: {
    chart: {
      type: 'candlestick',
      height: 350
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  },
};



function App() {
  const [series, setSeries] = useState([{
    data: []
  }]);

  const [priceTime, setPriceTime] = useState(null);

  useEffect(() => {
    let timeoutId;
    async function getLatestPrice() {
      try {
        const data = await getStonks();
        const gme = data.chart.result[0];
        setPriceTime(new Date(gme.meta.regularMarketTime * 1000));
        const quote = gme.indicators.quote[0];
        const prices = gme.timestamp.map((timestamp, index) => ({
          x: new Date(timestamp * 1000),
          y: [quote.open[index], quote.high[index], quote.low[index], quote.close[index]].map(round)
        }));
        setSeries([{
          data: prices,
        }]);
      } catch (error) {
        console.log(error);
      }

      // set the time for the price to change for every 5 seconds
      timeoutId = setTimeout(getLatestPrice, 5000 * 2);
    }

    getLatestPrice();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);


  return (
    <div>
      <Chart options={chart.options} series={series} type="candlestick" width="90%" height={520} />
      <table className='chart-intro'>
          <thead>
              <tr>
              <th>About S&P500 Index</th>
              </tr>
          </thead>
          <div>The S&P 500 Index, or Standard & Poor's 500 Index, is a market-capitalization-weighted index of 500 leading publicly traded companies in the U.S. It is not an exact list of the top 500 U.S. companies by market cap because there are other criteria that the index includes. </div>
          <div> As of September 30, 2021, the nine largest companies on the list of S&P 500 companies accounted for 28.1% of the market capitalization of the index and were, in order of weighting, Apple, Microsoft, Alphabet (including both class A & C shares), Amazon.com, Meta Platforms, Tesla, Nvidia, Berkshire Hathaway and JPMorgan Chase. The S&P 500 index is regarded as one of the best gauges of prominent American equities' performance, and by extension, that of the stock market overall.</div>
      </table>
    </div>
  );
}

export default App;