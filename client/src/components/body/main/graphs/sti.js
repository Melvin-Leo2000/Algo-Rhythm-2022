import { useEffect, useState} from 'react';
import Chart from 'react-apexcharts';



const round = (number) => {
  return number ? +(number.toFixed(2)) : null;
};
const stonksUrl = 'https://yahoo-finance-api.vercel.app/^STI';
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
              <th>About Straits Times Index</th>
              </tr>
          </thead>
          <div>The Straits Times Index is a capitalisation-weighted measurement stock market index that is regarded as the benchmark index for the stock market in Singapore. 
          It tracks the performance of the top 30 companies that are listed on the Singapore Exchange.</div>
          <div>The index is comprised of 55 of the exchange's most valuable firms. It is a modified value-weighted index, which is complicated in calculation, but ensures that the largest firms have the greatest impact on the index's value. 
          When taken together, the index's 55 components represent about 60% of the total market value of all issues traded on the Singapore Stock Exchange.</div>
      </table>
    </div>
  );
}

export default App;
