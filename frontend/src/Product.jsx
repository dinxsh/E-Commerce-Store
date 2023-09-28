import React from "react";
import  {Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import "./Product.css"

const options = {
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value:2.5,
    isHalf:true

}

export default function Product ({product}){
    return (
        <>
        <div className="section" id="section" > 
        <Link className="productCard" to={product._id}>
        <img className="product1" src={product.images[0].url} alt={product.name} ></img>
        <p>{product.name}</p>
        <div>
        <ReactStars {...options}/> <span>(256) reviews</span>
        </div>
        <span> {product.price} </span>
        </Link>
        </div>
        </>
    )
}