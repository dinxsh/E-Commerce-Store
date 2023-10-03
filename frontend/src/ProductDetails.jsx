import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "./actions/productAction";
import ReactStars from 'react-rating-stars-component'
import './ProductDetials.css'
import Review from './Review.jsx'
import Loader from "../Loader";
import { useAlert } from "react-alert";



 const ProductDetails = ({match}) =>{
    const dispatch = useDispatch();
    const alert = useAlert()

    let {product,error,loading} = useSelector(state=>state.productDetails)

    const options = {
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value:product.ratings,
        isHalf:true,
     
    }


    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(getProductDetails(match.params.id))
    },[dispatch,match.params.id, error, alert]);

    return <div>
           {loading? <Loader/> : 
           <>
            <div className="ProductDetails">
       
       <div className="box1" >
   <Carousel>
       {product.images && product.images.map((image,index)=>
           <img 
           className="CarouselImage"
           src={image.url}
           key={image.url}
           alt={`${index} Slide`}
           />
           )}
   </Carousel>
           </div>
           <div className="box2">
               
       <div className="detailsb-1" >
           <h1 className="name" >{product.name} </h1>
           <p> Product # {product._id} </p>
       </div>
       <div className="detailsBlock-2" >
           <ReactStars {...options} />
           <span> ({product.numofReviews}) Num of Reviews </span>                     
       </div>
       <hr></hr>

       <div className="detailsblock-3">
           <h1> ₹ {product.price}  </h1>
           <div className="detailsblock-3-1">
               <div className="detailsblock-3-1-1">
                   <button>-</button>
                   {/* <input value="1" /> */}
                   <button>+</button>
               </div>
               <button className="addtocart"> Add to Cart</button>
           </div>
           <hr></hr>

           <p> <b>Status : </b> 
               <b className={product.Stock < 1 ? "redColor": "greenColor" } 
               >
                   {product.Stock < 1 ? "OutofStock" : "InStock"}
                 </b>
           </p>
       </div>
           <div className="detailsblock-4">
            Description : <div> {product.description}</div>
           <button className="submit-review"> Submit Review </button>
           </div>  
           </div>
      </div>
      <hr></hr>
      <div> 
            <h3 className="sub-heading"> Reviews </h3>
             {
               product.reviews && product.reviews[0] ? (
                   <div  className="review-container" > 
               {product.reviews && product.reviews.map((review)=>(
                   <Review key={review._id} review = {review} />
                   ))}
               </div>
           ) : (
               <p className="no-review">
                   No Reviews Yet
               </p>
           ) }
           </div>
           </>
           }
    </div>
     
}

export default ProductDetails
