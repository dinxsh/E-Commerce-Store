import React, { useEffect } from "react";
import "./Home.css"
import cover from './assets/cover2.png'
import { CgMouse} from 'react-icons/all'
import Product from './Product.jsx'
import product1 from './assets/img1.jpg'
import MetaData from './MetaData' 
import actionProduct from "./actions/productAction";
import { useSelector , useDispatch} from 'react-redux'

const product = {
    name:"Blue Tshirt",
    images:[{url:product1}],
    price:"$30",
    _id:"abhishek"
}
export default function Home(){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(actionProduct());
    },[dispatch])

    return (
        <>
        <MetaData title="My Store" />
        <div className="Home">
            <div className="cover"></div>
            {/* <img className="cover" src={cover} ></img> */}
        </div>
        <div className="Home-text">
                <h1>MyStore</h1>
                <h3>Shop Outside the Box!</h3>
                <button href="#section" className="scroll-btn"> <a className="scrolla" href="#section"> <CgMouse/></a></button>
            </div>
            <div className="Feature">
            <h2>Featured Products</h2>
            </div>
            <div className="container">
            <Product product={product}></Product>
            <Product product={product}></Product>
            <Product product={product}></Product>
            <Product product={product}></Product>
            <Product product={product}></Product>
            <Product product={product}></Product>
            <Product product={product}></Product>
            <Product product={product}></Product>
            </div>
            
        </>
    )
}