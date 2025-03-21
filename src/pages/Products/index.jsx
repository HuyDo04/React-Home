import React, { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";

const Products = () => {
  const [products, setProducts] = useState([]);
  return (
    <div className="page-container">
      <h1 className="page-title">Danh Sách Sản Phẩm</h1>

      <ProductList setProducts={setProducts} query="" />
    </div>
  );
};

export default Products;
