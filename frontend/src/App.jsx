import { BrowserRouter as Router ,Route } from 'react-router-dom'
// import './App.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Home from './Home.jsx'
import Loader from '../Loader.jsx'
import ProductDetails from './ProductDetails.jsx'
import Products from './Products.jsx'
import Search from './Search.jsx'

function App() {
  return ( 
    <>
    <Router>
    <Header />
    <Route exact path='/' component={Home} /> 
    <Route  exact path='/product/:id' component={ProductDetails } /> 
    <Route  exact path='/products' component={Products } /> 
    <Route  path='/products/:keyword' component={Products } /> 
    <Route  exact path='/Search' component={Search } /> 

    <Footer/>
    </Router>
    </>
  )
}
 
export default App
