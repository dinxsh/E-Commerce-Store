import { BrowserRouter as Router ,Route } from 'react-router-dom'
// import './App.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Home from './Home.jsx'

function App() {
  return (
    <>
    <Router>
    <Header />
    <Home/>
    <Footer/>
    </Router>
    </>
  )
}
 
export default App
