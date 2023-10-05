import React from 'react'
import { ReactNavbar } from 'overlay-navbar'
import LOGO from "./assets/LOGO.png"
import {FaUserAlt, FaSearch, FaShoppingCart } from "react-icons/fa"
import "./Navbar.css"
  
export default function Header(){
return ( <>
        <div className='navbar'>
        <img className='LOGO' src={LOGO}></img>
        </div>
        <div className='hr'></div>
        <ReactNavbar
        profileIcon={true}
        profileIconUrl="/login"
        ProfileIconElement = {FaUserAlt}
        searchIcon ={true}
        SearchIconElement = {FaSearch}
        cartIcon = {true}
        CartIconElement = {FaShoppingCart}
        logo={LOGO}
        link1Margin="2rem"
        link2Margin="5rem"
        link3Margin="5rem"
        link4Margin="4rem"
        link1Color="black"
        link1Text="Home"
        link1ColorHover="crimson"
        link2Text="Products"
        link1Url = "/"
        link2Url = "/products"
        link3Text="About "
        link4Text="Contact "
        link1Size ="1.4vmax"
        link1Family="Sans-serif"
        navColor1="rgb(230,230,230)"
        searchIconMargin="0.5vmax"
        cartIconMargin="1vmax"
        profileIconMargin="0.5vmax"
        searchIconColor="#121212"
        cartIconColor="#121212"
        profileIconColor="#121212"
        searchIconColorHover="crimson"
        cartIconColorHover="crimson"
        profileIconColorHover="crimson"
        />
        </>)
        

}