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
        ProfileIconElement = {FaUserAlt}
        searchIcon ={true}
        SearchIconElement = {FaSearch}
        cartIcon = {true}
        CartIconElement = {FaShoppingCart}
        logo={LOGO}
        link1Margin="2rem"
        link2Margin="2rem"
        link3Margin="2rem"
        link4Margin="2rem"
        link1Color="black"
        link1Text="Home"
        link2Text="Products"
        link1Url = "/"
        link2Url = "/products"
        link3Text="About Us"
        link4Text="Contact Us"
        link1Size ="17px"
        link1Family="Arial"
        navColor1="#DADADA"
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