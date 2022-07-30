import { useEffect, useState, useMemo } from 'react';
import Chart from 'react-apexcharts';



const round = (number) => {
  return number ? +(number.toFixed(2)) : null;
};
const stonksUrl = 'https://yahoo-finance-api.vercel.app/^N225';
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
                      <th>About Nikkei Asia</th>
                      </tr>
                  </thead>
                  <div>The Nikkei-225 Stock Average is a price-weighted average of 225 top-rated Japanese companies listed in the First Section of the Tokyo Stock Exchange. 
                  The Nikkei Stock Average was first published on May 16, 1949, where the average price was ¥176.21 with a divisor of 225. Among the best-known companies included in the Nikkei index are Canon Incorporated, Sony Corporation, and Toyota Motor Corporation. 
                  It is the oldest stock index in Asia.</div>
                  <div>Established as part of the rebuilding and industrialization of Japan in the aftermath of the Second World War, 
                  constituent stocks are ranked by share price, rather than by market capitalization as is common in most indexes. Valuations are denominated in Japanese yen. The composition of the Nikkei is reviewed every September, and any needed changes take place in October.</div>
                </table>
    </div>
  );
}

export default App;