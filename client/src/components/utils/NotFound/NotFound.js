import React from 'react'
import "./NotFound.css"
import Header from "../../header/Header"


export default function NotFound() {
  return (
    <div>
    <Header />
        <div id="background"></div>
<div class="top">
  <h1 className='fof'>404</h1>
  <h3 className='pnf'>page not found</h3>
</div>
<div class="container-ghost">
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
  <p className="boo">Boo, looks like a ghost stole this page</p>
  <p className="boo">Try other pages in Algo-Rhythm!</p>
</div>
    </div>
  )
}
