import React from "react";
import ReactStars from 'react-rating-stars-component'
import ProfilePng from './assets/user.png'


function Review({ review }) {

    const options = {
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value:review.rating,
        isHalf:true,
     
    }

return  <div className="review-card">
        <img src={ProfilePng} className="userpfp" alt="UserPFP" />
        <p> <b>{review.name}</b></p>
        <ReactStars {...options} />
        <span>{review.comment} </span>
        </div>
};

export default Review