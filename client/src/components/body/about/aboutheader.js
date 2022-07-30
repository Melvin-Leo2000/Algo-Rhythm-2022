import React from 'react'
import logo from '../../images/logo.png'
import './about.css'


export default function aboutheader() {
  return (
    <div>
        <header className='aboutheader'>
            <img src={logo} alt='Logo' />
            <ul>
                <a href="/about"><li className='abouthome'>About Us</li></a>
                <a href="/login"><li className='aboutlog'>Login</li></a>
            </ul>
        </header>
    </div>
  )
}
