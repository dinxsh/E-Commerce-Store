import React from 'react'
import "./Footer.css"
import playstore from "./assets/playstore.png"
export default function Footer (){
    return (
        <>
        <div className='Footer'>
        <div className='left-footer'>
            <p>Download our App</p>
            <div className='text'>Download App for Android and IOS mobile phone</div>
            <div> <img src={playstore} className='playstore' ></img> </div>
        </div>
        <div className='mid-footer'>
            <h1> MYSTORE</h1>
            <p className='cursive'> Shop Out of the Box!</p>
            <p className='copy'> Copyrights 2023 &copy; piyushhsainii </p>
        </div>
        <div className='right-footer'>
            <p>Follow us</p>
            <a>Instagram</a>
            <a>LinkedIn</a>
            <a>GitHub</a>
        </div>
        </div>
        </>
    )
}