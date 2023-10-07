import { BrowserRouter as Router ,Route } from 'react-router-dom'
// import './App.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Home from './Home.jsx'
import Loader from '../Loader.jsx'
import ProductDetails from './ProductDetails.jsx'
import Products from './Products.jsx'
import Search from './Search.jsx'
import Login from './Login.jsx'

import {useDispatch , useSelector } from 'react-redux'
import { loadUser } from './actions/userAction.jsx'
import { useEffect } from 'react'
import UserOptions from './UserOptions.jsx'
import store from "./store";

function App() {

  const {loading, isAuthenticated ,user } = useSelector((state)=> state.user)


  useEffect(()=>{
    store.dispatch(loadUser());
  },[])

  return ( 
    <>
    <Router>
    <Header />
    {isAuthenticated && <UserOptions user={user}/> }
    <Route exact path='/' component={Home} /> 
    <Route  exact path='/product/:id' component={ProductDetails } /> 
    <Route  exact path='/products' component={Products } /> 
    <Route  path='/products/:keyword' component={Products } /> 
    <Route  exact path='/Search' component={Search } /> 
    <Route  exact path='/Login' component={Login } /> 


    <Footer/>
    </Router>
    </>
  )
}
 
export default App
