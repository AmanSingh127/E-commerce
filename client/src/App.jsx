import React,{useState} from 'react'
import {Routes,Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Builder from './pages/Builder'

function App() {

    const [cart,setCart]=useState([])
  return (
    <>
    <Navbar cart={cart}/>

    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/products" element={ <Products cart={cart} setCart={setCart}/> } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/cart' element={<Cart cart={cart} setCart={setCart} />} />
        <Route path='/builder' element={<Builder/>}/>
    </Routes>
    </>
  )
}

export default App