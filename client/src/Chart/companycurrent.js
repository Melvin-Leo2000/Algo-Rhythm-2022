import { useEffect, useState} from 'react';
import Chart from 'react-apexcharts';
import './s&p.css'

const round = (number) => {
  return number ? +(number.toFixed(2)) : null;
};

export default function Realtimestock(props){
    const StockSymbol = props.stonk.toUpperCase();
    const stonksUrl = 'https://yahoo-finance-api.vercel.app/'+ StockSymbol;
    async function getStonks() {
    const response = await fetch(stonksUrl);
    return response.json();
    }

    const chart = {
        options: {
          chart: {
            type: 'candlestick',
            width: '50%'
          },
          title: {
            text: 'Current Day trading price of ' + StockSymbol,
            align: 'centre'
          },
          itemMargin: {
            horizontal: 5,
            vertical: 0
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
    <div className='current-chart'>
      <Chart options={chart.options} series={series} type="candlestick" width="100%" height={720} />
    </div>
  );
}

