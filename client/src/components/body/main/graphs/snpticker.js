import { useEffect, useState, useMemo } from 'react';




export default function Tracker() {
  //using states to compare pricing 
  const [price, setPrice] = useState(-1);
  const [prevPrice, setPrevPrice] = useState(-1);
  const [pricededuct, setpricededuct] = useState(-1)
  const [percentage, setPercentage] = useState(-1)

  //calling the real time stock api from Yahoo finance that refreshes when the market is open
  const stonksUrl = 'https://yahoo-finance-api.vercel.app/^GSPC';
  async function getStonks() {
    const response = await fetch(stonksUrl);
    return response.json();
  }

  useEffect(() => {
    let timeoutId;
    //function to call latest price 
    async function getLatestPrice() {
      try {
        // fetching the stock data, parsing the json data to get the updated marketprice and roudn to 2dp
        const data = await getStonks();
        const stockprice = data.chart.result[0];
        setpricededuct((stockprice.meta.regularMarketPrice.toFixed(2) - stockprice.meta.previousClose.toFixed(2)).toFixed(2))
        // current stonk price
        setPrevPrice(price);
        setPrice(stockprice.meta.regularMarketPrice.toFixed(2));
        setPercentage((((stockprice.meta.regularMarketPrice.toFixed(2) - stockprice.meta.previousClose.toFixed(2))/stockprice.meta.previousClose.toFixed(2))* 100).toFixed(2))



      } catch (error) {
        console.log(error);
      }

      // calls the function get latest price every second
      timeoutId = setTimeout(getLatestPrice, 3000);
    }


    getLatestPrice();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const value = useMemo(() => pricededuct > 0 ? 'up' : pricededuct < 0  ? 'down' : '');
  const direction = useMemo(() => prevPrice < price ? 'up' : prevPrice > price ? 'down' : '', [prevPrice, price]);
  return (
    <div>
    <div className={['price', direction].join(' ')}>
      {price} <b className={['price', value].join(' ')}>{pricededuct} ({percentage}%)</b>
    </div>
    </div>
  )
}