import {React,useState} from 'react';
import Header from "../../header/Header"
import "./main.css"
import {useSelector} from 'react-redux'
import  { Navigate } from 'react-router-dom'
import News from '../../news/news'
import Stock from '../../../Chart/s&p'
import Dow from './graphs/dow'
import STI from './graphs/sti'
import Hsi from './graphs/hsi'
import Nikkei from './graphs/nikkei'
import Snpticker from './graphs/snpticker'
import Dowticker from './graphs/dowticker'
import Stiticker from './graphs/stiticker'
import Hsiticker from './graphs/histicker'
import Nikkeiticker from './graphs/nikkeiticker'
import Technews from './technews/technews'


export default function Main() {
    const auth = useSelector(state => state.auth)
    const [dow, setdow] = useState(true)
    const [snp, setsnp] = useState(false)
    const [sti, setsti] = useState(true)
    const [hsi, sethsi] = useState(true)
    const [nikkei, setnikkei] = useState(true)

    const snpsubmit = (e) => {
      e.preventDefault();
      setsnp(false)
      setdow(true)
      setsti(true)
      sethsi(true)
      setnikkei(true)
    }

    const dowsubmit = (e) => {
      e.preventDefault();
      setdow(false)
      setsnp(true)
      setsti(true)
      sethsi(true)
      setnikkei(true)
    }

    const stisubmit = (e) => {
      e.preventDefault();
      setdow(true)
      setsnp(true)
      setsti(false)
      sethsi(true)
      setnikkei(true)
    }

    const hsisubmit = (e) => {
      e.preventDefault();
      setdow(true)
      setsnp(true)
      setsti(true)
      sethsi(false)
      setnikkei(true)
    }

    const nikkeisubmit = (e) => {
      e.preventDefault();
      setdow(true)
      setsnp(true)
      setsti(true)
      sethsi(true)
      setnikkei(false)
    }
    

    const {user, isLogged} = auth

    const userLink = () => {
    return <div>
        <Header />
        <div>
          <div className='greeting'><b>Welcome back {user.name}.</b></div>
          <div className='main-trends'>Check out the latest news, analyses, and market trends here.</div>
        </div>
        <h2 className='market-indices'>Market Summary</h2>
        <div className='market-benchmark'>Your benchmarks for your individual portfolios in the US and Asia</div>
        <div className='form-groups'>
        <form className='main-button-group' onSubmit={snpsubmit}>
          <button className='main-button' type="submit"><b>S&P500</b><Snpticker></Snpticker></button>
        </form>
        <form className='main-button-group' onSubmit={dowsubmit}>
          <button className='main-button' type="submit"><b>Dow 30</b><Dowticker></Dowticker></button>
        </form>
        <form className='main-button-group' onSubmit={stisubmit}>
          <button className='main-button' type="submit"><b>Straits Times Index</b><Stiticker></Stiticker></button>
        </form>
        <form className='main-button-group' onSubmit={hsisubmit}>
          <button className='main-button' type="submit"><b>Hang Seng Index</b><Hsiticker></Hsiticker></button>
        </form>
        <form className='main-button-group' onSubmit={nikkeisubmit}>
          <button className='main-button' type="submit"><b>Nikkei 225</b><Nikkeiticker></Nikkeiticker></button>
        </form>
        </div>
          <div className="market">
            {
                !snp?
                <Stock></Stock>
                :null
            }
            {
                !dow?
                <Dow></Dow>
                :null
            }
            {
                !sti?
                <STI></STI>
                :null
            }
            {
                !hsi?
                <Hsi></Hsi>
                :null
            }
            {
                !nikkei?
                <Nikkei></Nikkei>
                :null
            }
          </div>

          <div className='news-section'>
          <div className="snaps">
            <h2>Rhythm-share</h2>
            <p>Read what other traders are saying</p>
          </div>
            <News></News>
          </div>

          <h2 className='tech-news-h2'>Latest news on technology, financial markets</h2>
          <div className='breakingnews'>Breaking news and more on tech stocks</div>
          <div className='main-tech-news'>
            <Technews></Technews>
          </div>
          
    </div>

    }
    const transForm = {
      transform: isLogged ? "translateY(-5px)" : 0
    }

  return (
      <div className='welcome'>
        <div className="sticky-thc">
        </div>
          <div style={transForm}>
                {
                    isLogged
                    ? userLink()
                    :<Navigate to='/main' />
                    
                }
                
            </div>
      </div>
  )
}
