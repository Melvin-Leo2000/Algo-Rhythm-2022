import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./authentication/login"
import Home from "./Landing/landing"
import About from "./about/about"
import Register from "./authentication/register"
import ActivationEmail from './authentication/ActivationEmail'
import Main from "./main/main"
import Profile from "./profile/profile"
import NotFound from '../utils/NotFound/NotFound';
import Post from "../body/posts/post"
import Write from "../../components/body/newpost/newpost"
import News from "../../components/news/news"
import Charts from "../../Chart/chart"
import Errorchart from '../../Chart/errorchart/errorchart'

import {useDispatch, useSelector} from 'react-redux'
import {dispatchLogin, fetchUser, dispatchGetUser} from '../../redux/actions/authAction'
import axios from 'axios';




function App() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.token)
    const auth = useSelector(state => state.auth)
  
  
    useEffect(() => {
      const firstLogin = localStorage.getItem('firstLogin')
      if(firstLogin){
        const getToken = async () => {
          const res = await axios.post('/user/refresh_token', null)
          dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
        }
        getToken()
      }
    },[auth.isLogged, dispatch])
  
    useEffect(() => {
      if(token){
        const getUser = () => {
          dispatch(dispatchLogin())
  
          return fetchUser(token).then(res => {
            dispatch(dispatchGetUser(res))
          })
        }
        getUser()
      }
    },[token, dispatch])

    return (
    <BrowserRouter>
        <Routes>
            <Route path="/about" element={< About />} />
            <Route path="/login" element={< Login />} />
            <Route path="/" element={< Home />} />
            <Route path="/register" element={< Register />} />
            <Route path="/user/activate/:activation_token" element={< ActivationEmail />} />
            <Route path="/main" element={< Main />} />
            <Route path="/profile" element={< Profile />} />
            <Route path="*" element={< NotFound />} />
            <Route path="/post" element={< Post />} />
            <Route path="/writepost" element={< Write />} />
            <Route path="/news" element={< News />} />
            <Route path="/post/:id" element={< Post />} />
            <Route path="/chart" element={< Charts />} />
            <Route path="/chartnotfound" element={< Errorchart />} />
        </Routes>
    </BrowserRouter>
    );
} 


export default App;