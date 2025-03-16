import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"


function Home() {
    return (
        <>
            <nav className="navbar">
                <Link to="/new-product" className="nav-link">New Product</Link>
                <Link to="/products" className="nav-link">Products</Link>
                <Link to="/search" className="nav-link">Search</Link>
            </nav>
        </>
    )
}

export default Home