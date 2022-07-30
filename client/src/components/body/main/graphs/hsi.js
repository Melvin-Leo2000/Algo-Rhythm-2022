import { useEffect, useState} from 'react';
import Chart from 'react-apexcharts';


const round = (number) => {
  return number ? +(number.toFixed(2)) : null;
};
const stonksUrl = 'https://yahoo-finance-api.vercel.app/^HSI';
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
                      <th>About Hang Seng Index</th>
                      </tr>
                  </thead>
                  <div>The Hang Seng Index is a freefloat-adjusted market-capitalization-weighted stock-market index in Hong Kong.
                   It is used to record and monitor daily changes of the largest companies of the Hong Kong stock market and is the main indicator of the overall market performance in Hong Kong.</div>
                  <div>Because of Hong Kong's status as a special administrative region of China, there are close ties between the two economies, and many Chinese companies are listed on the Hong Kong Exchange.
                  The index aims to capture the leadership of the Hong Kong exchange and covers approximately 65% of its total market capitalization.</div>
                </table>
    </div>
  );
}

export default App;