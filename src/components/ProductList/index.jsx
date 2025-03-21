import { use, useEffect, useState } from "react";
import "./ProductList.css";
import Loading from "../Loading";

function ProductList({ query }) {
  const params = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(+params.get("page") || 1);
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api01.f8team.dev/api/products?q=${query}&page=${currentPage}&per_page=${perPage}`
    )
      .then((res) => res.json())
      .then((res) => {
        const filterProducts = query
          ? res.data.filter((item) =>
              item.title.toLowerCase().includes(query.toLowerCase())
            )
          : res.data;
        setProducts(filterProducts);
        setTotalPage(res.last_page);
        setNext(res.next_page_url);
        setPrev(res.prev_page_url);
        history.replaceState(
          null,
          null,
          `?q=${query}&page=${currentPage}&per_page=${perPage}`
        );
      })
      .catch((error) => console.error("Error", error))
      .finally(() => setLoading(false));
  }, [currentPage, perPage, query]);
  return (
    <div className="product-list-container">
      {loading ? (
        <Loading />
      ) : (
        <>
          <ul className="product-list">
            {products.length === 0 ? (
              <p>Không có sản phẩm nào</p>
            ) : (
              products.map((product) => (
                <li key={product.id} className="product-item">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-price">{product.price}</p>
                    <p className="product-stock">{product.stock}</p>
                  </div>
                </li>
              ))
            )}
          </ul>

          <div className="pagination-container">
            <div className="items-per-page">
              <label htmlFor="itemsPerPage">Hiển thị:</label>
              <select
                id="itemsPerPage"
                className="items-select"
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            <div className="pagination">
              <button
                className="page-button"
                disabled={!prev}
                onClick={() => setCurrentPage((p) => (prev ? p - 1 : p))}
              >
                ⬅ Trước
              </button>
              <div className="page-numbers">
                {[...Array(totalPage)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={index}
                      className={`page-numbers ${
                        currentPage === page ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              <button
                className="page-button"
                disabled={!next}
                onClick={() => setCurrentPage((n) => (next ? n + 1 : n))}
              >
                Tiếp ➡
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductList;
