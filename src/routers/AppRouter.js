import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavbarHeader from '../components/shared/NavbarHeader';
import Home from '../components/views/Home';
import Products from '../components/views/Products';
import ListProducts from '../components/views/ListProducts';

const AppRouter = () => {
    const [ listCart, setListCart ] = useState(false);

    const setRefresList = () => {
        setListCart(!listCart);
    }

    return (
        <Router>
            <NavbarHeader listCart={listCart} setListCart={setListCart} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products setRefresList={setRefresList} />} />
                <Route path="/products/admin" element={<ListProducts />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;