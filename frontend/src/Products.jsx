import React, { useEffect, useState } from "react";
import './Products.css'
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import Product from './ProductCard'
import actionProduct, { clearErrors, getProductDetails } from "./actions/productAction";
import Pagination from "react-js-pagination";
import  {Slider}  from  "@material-ui/core";
import {Typography} from "@material-ui/core";
import { useAlert } from "react-alert";
import MetaData from './MetaData' 


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
    const alert = useAlert()

    //states
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0,25000])
    const [ category, setCategory] = useState("")
    const [ rating, setRating] = useState(0)
    
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

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

       dispatch(actionProduct(keyword,currentPage, price,category ,rating))
    },[dispatch, keyword,match.params.keyword , currentPage,price ,category ,rating,error])
    return (
        <>
        {loading ? <Loader/>
        :(
            <div>
                <MetaData title="Products | MyStore"   />
                    <p className="product-text"> Products </p>
                <div className="Products">
                    {products&& products.map((product)=>( 
                        <div key={product._id}  > 
                        <Product key={product._id} product={product} />
                        </div>
                    ))}
                </div>

                   <div className="Filterbox" >
                    <Typography> Price </Typography>
                        <Slider 
                         value={price}
                         onChange={priceHandler}
                         valueLabelDisplay="auto"
                         aria-labelledby="range-slider"
                         min={0}
                         max={25000}
                        />
                   </div>
                   <ul className="categoryBox" >
                   <Typography className="category-heading" ><b>Categories</b></Typography>
                        { 
                            categories.map((category)=>(
                                <li
                                className="category-link" 
                                key={category}
                                onClick={()=> setCategory(category)}>  
                                    {category}
                                </li>
                            ))
                        }
                   </ul>

                    <fieldset className="field-set" >
                        <Typography >Ratings Above</Typography>
                        <Slider 
                        className="rating-slider"
                        value={rating}
                        aria-labelledby="continous-slider"
                        min={0}
                        max={5}
                        onChange={(e, newRating)=>{ 
                            setRating(newRating)
                        }}
                        valueLabelDisplay="auto"
                        >
                        </Slider>
                    </fieldset>

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