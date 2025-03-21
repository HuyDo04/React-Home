import React, { useState } from "react";
import "./ProductForm.css";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ submitTitle = "Thêm Sản Phẩm", setLoading }) => {
  const data = [
    { name: "title", placeholder: "Tên sản phẩm" },
    {
      name: "description",
      placeholder: "Mô tả sản phẩm",
      type: "textarea",
    },
    { name: "category", placeholder: "Danh mục" },
    { name: "price", placeholder: "Giá ($)", type: "number" },
    {
      name: "discountPercentage",
      placeholder: "Giảm giá (%)",
      type: "number",
    },
    { name: "rating", placeholder: "Đánh giá (0-5)", type: "number" },
    { name: "stock", placeholder: "Tồn kho", type: "number" },
    { name: "tags", placeholder: "Tags (cách nhau bằng dấu phẩy)" },
    { name: "brand", placeholder: "Thương hiệu" },
    { name: "sku", placeholder: "Mã SKU" },
    { name: "weight", placeholder: "Trọng lượng (kg)", type: "number" },
    {
      name: "minimumOrderQuantity",
      placeholder: "Số lượng tối thiểu",
      type: "number",
    },
    { name: "thumbnail", placeholder: "URL hình ảnh" },
  ];

  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    tags: [],
    brand: "",
    sku: "",
    weight: "",
    minimumOrderQuantity: "",
    thumbnail: "",
  });

  const [errors, setErrors] = useState({});

  const setFieldValue = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]:
        name === "tags" ? value.split(",").map((tag) => tag.trim()) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch("https://api01.f8team.dev/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("API Error:", data);
        throw data;
      }
      setErrors({});
      navigate("/products");
    } catch (error) {
      alert("Lỗi khi tạo sản phẩm");
      setErrors(error.errors || {});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <form className="product-form" onSubmit={handleSubmit}>
        {data.map(({ name, placeholder, type = "text" }) => (
          <div className="form-group" key={name}>
            {type === "textarea" ? (
              <textarea
                name={name}
                className="form-textarea"
                value={formValues[name]}
                onChange={setFieldValue}
                placeholder={placeholder}
                required
              />
            ) : (
              <input
                type={type}
                name={name}
                className="form-input"
                value={formValues[name]}
                onChange={setFieldValue}
                placeholder={placeholder}
                required
              />
            )}
          </div>
        ))}

        <button type="submit" className="submit-button">
          {submitTitle}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
