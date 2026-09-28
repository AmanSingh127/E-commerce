import React, { useState } from 'react'
import { Routes, Route,useLocation } from 'react-router-dom'

import Navbar from './components/navbar'
import AdminNavbar from './components/adminNavbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Builder from './pages/Builder'
import Admin from './pages/Admin'
import AddProducts from './pages/addProduct'


function App() {
        const location = useLocation()
    const isAdmin = location.pathname.startsWith('/admin')
    const [cart, setCart] = useState([])

    return (
        <>
           {isAdmin ? (
        <AdminNavbar />
      ) : (
        <Navbar cart={cart} />
      )}

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/admin" element={<Admin />} />

                <Route
                    path="/products"
                    element={<Products cart={cart} setCart={setCart} />}
                />

                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<Signup />} />

                <Route
                    path="/cart"
                    element={<Cart cart={cart} setCart={setCart} />}
                />

                <Route path="/builder" element={<Builder />} />
                <Route path="/add" element={<AddProducts />} />
                
            </Routes>

            <Footer />
        </>
    )
}

export default App