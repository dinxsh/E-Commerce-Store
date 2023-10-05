import React, { Fragment, useEffect } from "react";
import "./Home.css"
import cover from './assets/cover2.png'
import { CgMouse} from 'react-icons/all'
import Product from './ProductCard'
import MetaData from './MetaData' 
import actionProduct, { clearErrors } from "./actions/productAction";
import { useSelector , useDispatch} from 'react-redux'
import Loader from "../Loader";
import { useAlert } from "react-alert";


export default function Home(){ 
    const dispatch = useDispatch();
    const alert = useAlert()

    const {loading, error, products}  = useSelector((state)=> state.products)

    useEffect(()=>{
        if(error){
            dispatch(clearErrors())
             alert.error(error)
        }
        dispatch(actionProduct());
    },[dispatch,error, error, alert])

    return (
        <>
        {loading? <Loader/> :
        < >
        <div className="fragment">
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
            {products && products.map(product=>(
                <Product key={product._id} product={product} ></Product>
            ))}
            </div>
            </div>
        </>
        }        
        </>
    )
}