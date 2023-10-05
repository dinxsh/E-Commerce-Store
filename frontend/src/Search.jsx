import React, { useState } from "react";
import './Search.css'
import {FaSearch } from "react-icons/fa"
import MetaData from "./MetaData";

export default function Search( {history}){
    const [keyword, setKeyword] = useState("");
    function searchSubmitHandler(e){
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/products/${keyword}`)
        } else {
            history.push('/products')
        }
    }


    return (
        <>
        <MetaData title="Search " />
        <form onSubmit={searchSubmitHandler} className="searchBox" >
        <input type="text"
            placeholder="Search Product ..."
            onChange={ (e)=>  setKeyword(e.target.value)}
            />
        <input type="submit" value="Search"/> 
        </form>
        </>
        )
}