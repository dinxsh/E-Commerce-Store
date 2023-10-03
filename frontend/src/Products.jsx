import React, { useEffect, useState } from "react";
import './Products.css'
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import Product from './Product'
import actionProduct, { clearErrors, getProductDetails } from "./actions/productAction";
import Pagination from "react-js-pagination";
import  {Slider}  from  "@material-ui/core";
import {Typography} from "@material-ui/core";


const categories = [
    "Electronics",
    "Footwear",
    "Bottom",
    "Top,",
    "Attire",
    "Camera",
    "SmartPhones"
];




const Products = ({match}) =>{

    const dispatch = useDispatch();

    //states
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0,25000])
    const [ category, setCategory] = useState("")
    
    const {loading, error, products, productCount , resultsPerPage}  = useSelector((state)=> state.products)
    const keyword= match.params.keyword

    //Handlers
    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)
    }
    
    const priceHandler= (event, newPrice)=>{
        setPrice(newPrice)
    }  

    useEffect(()=>{
       dispatch(actionProduct(keyword,currentPage, price))
    },[dispatch, keyword,match.params.keyword , currentPage,price])
    return (
        <>
        {loading ? <Loader/>
        :(
            <div>
                    <p className="product-text"> Products </p>
                <div className="Products">
                    {products&& products.map((product)=>( 
                        <div key={product._id}  > 
                        <Product key={product._id} product={product} />
                        </div>
                    ))}
                </div>

                   {/* <div className="Filterbox" >
                    <Typography> Price </Typography>
                        <Slider 
                         value={price}
                         onChange={priceHandler}
                         valueLabelDisplay="auto"
                         aria-labelledby="range-slider"
                         min={0}
                         max={25000}
                        />
                   </div> */}
                   <Typography>Categories</Typography>
                   <ul className="categoryBox" >
                        {
                            categories.map((category)=>(
                                <li 
                                key={category}
                                onClick={()=> setCategory(category)}
                                >  
                                    {category}
                                </li>
                            ))
                        }
                   </ul>

                <div className="pagination" >
                   {resultsPerPage>productCount? "":
                    <Pagination
                    activePage={currentPage}
                    onChange={setCurrentPageNo}
                    itemsCountPerPage={resultsPerPage}
                    totalItemsCount={productCount}
                    nextPageText={"Next"}
                    prevPageText={"Prev"}
                    firstPageText={"1st"}
                    lastPageText={"last"}
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                    />}
                     </div>
            </div>
        )}
        </>
    )
}

export default Products