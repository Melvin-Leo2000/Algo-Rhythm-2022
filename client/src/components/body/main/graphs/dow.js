import { useEffect, useState, useMemo } from 'react';
import Chart from 'react-apexcharts';



const round = (number) => {
  return number ? +(number.toFixed(2)) : null;
};
const stonksUrl = 'https://yahoo-finance-api.vercel.app/DOW';
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
              <th>About Dow Jones Industrial Average</th>
              </tr>
          </thead>
          <div>The Dow Jones Industrial Average (DJIA), also known as the Dow 30, is a stock market index that tracks 30 large, publicly-owned blue-chip companies trading on the New York Stock Exchange (NYSE) and Nasdaq.</div>
          <div>Often referred to simply as "the Dow," the DJIA is one of the most-watched stock market indexes in the world. While the Dow includes a range of companies, all can be described as blue-chip companies with consistently stable earnings.

When the index initially launched in 1896, it included only 12 companies. Those companies were primarily in the industrial sector, including railroads, cotton, gas, sugar, tobacco, and oil.</div>
      </table>
    </div>
  );
}

export default App;