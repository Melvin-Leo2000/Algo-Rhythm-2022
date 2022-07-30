import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import logo from './logo.png';
import "./header.css"



function Header() {
    const auth = useSelector(state => state.auth)

    const {user, isLogged} = auth


    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const userLink = () => {
        return  <div class="navbar">
        <a href="/"><ul className='logo'><b>Algo-Rhythm!</b></ul></a>
        <ul>
            <li><a href="/main">Home</a></li>
            <li><a href="/writepost">Rhythm-Share</a></li>
            <li><a href="/chart">Rhythm-Check</a></li>
            <li><a href="/about">About Us</a></li>
            <li class="drop-nav">
                <li><a href="/profile">{user.name} </a></li>
                <ul className="dropdown">
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/" onClick={handleLogout}>Logout</a></li>
            </ul>
            </li>
        </ul>
      </div>

    }

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }

    return (
        <header>
            <ul style={transForm}>
                {
                    isLogged
                    ? userLink()
                    :<div className='nav-sign'><li><a href='/login'>Sign in</a></li></div>
                    
                }
                
            </ul>
        </header>
    )
}

export default Header


