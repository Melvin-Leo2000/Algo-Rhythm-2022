import React from 'react'
import './newerror.scss'
import Header from '../../components/header/Header'

export default function errorchart() {
  return (
    <div>
    <Header></Header>
        <div id="background"></div>
<div class="top">
  <h1>Invalid Stock price</h1>
  <h3>Stock not found :(</h3>
</div>
<div class="container">
  <div class="ghost-copy">
    <div class="one"></div>
    <div class="two"></div>
    <div class="three"></div>
    <div class="four"></div>
  </div>
  <div class="ghost">
    <div class="face">
      <div class="eye"></div>
      <div class="eye-right"></div>
      <div class="mouth"></div>
    </div>
  </div>
  <div class="shadow"></div>
</div>
<div class="bottom">
  <div class="error-buttons">
    <a href='/chart'><button class="btn">Go Back</button></a>
  </div>
</div>

    </div>
  )
}
