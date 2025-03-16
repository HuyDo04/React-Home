import React, { useState } from "react";
import "./ProductForm.css";
import { Navigate, useNavigate } from "react-router-dom";

const ProductForm = ({ submitTitle = "" , setLoading}) => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        discountPercentage: "",
        rating: "",
        stock:"",
        tags : [],
        brand: "",
        sku: "",
        weight: "",
        minimumOrderQuantity: "",
        thumbnail: "",
    });

    const [errors, setErrors] = useState({});

    const setFieldValue = (e) => {
        if (e.target.name === "tags") {
            const tags = e.target.value.split(",").map((tag) => tag.trim());
            setFormValues({ ...formValues, tags });
        } else {
            setFormValues({
                ...formValues,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Bật loading khi bắt đầu gửi dữ liệu
    setErrors({});

    fetch("https://api01.f8team.dev/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormValues({
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
          setErrors({});
          console.log(formValues)
          navigate("/products")
        } else {
          setErrors(data.errors || {});
        }
      })
      .finally(() => {
        setLoading(false); // Tắt loading khi xử lý xong
      });
  };

    return (
        <div className="product-form-container">
            <form className="product-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        name="title"
                        className="form-input"
                        value={formValues.title}
                        onChange={setFieldValue}
                        placeholder="Tên sản phẩm"
                        required
                    />
                     {errors.title && <p className="error-message">{errors.title}</p>}
                </div>

               <div className="form-group">
                    <textarea
                        name="description"
                        className="form-textarea"
                        value={formValues.description}
                        onChange={setFieldValue}
                        placeholder="Mô tả sản phẩm"
                        required
                    />
                    {errors.description && <p className="error-message">{errors.description}</p>}
                </div>
  
                <div className="form-group">
                    <input
                        type="text"
                        name="category"
                        className="form-input"
                        value={formValues.category}
                        onChange={setFieldValue}
                        placeholder="Danh mục"
                        required
                    />
                     {errors.category && <p className="error-message">{errors.category}</p>}
                </div>

                <div className="form-group">
                    <input
                        type="number"
                        name="price"
                        className="form-input"
                        value={formValues.price}
                        onChange={setFieldValue}
                        placeholder="Giá ($)"
                        required
                    />
                     {errors.price && <p className="error-message">{errors.price}</p>}
                </div>

                <div className="form-group">
                    <input
                        type="number"
                        name="discountPercentage"
                        className="form-input"
                        value={formValues.discountPercentage}
                        onChange={setFieldValue}
                        placeholder="Giảm giá (%)"
                        required
                    />
                     {errors.discountPercentage && <p className="error-message">{errors.discountPercentage}</p>}
                </div>

                <div className="form-group">
                    <input
                        type="number"
                        name="rating"
                        className="form-input"
                        value={formValues.rating}
                        onChange={setFieldValue}
                        placeholder="Đánh giá (0-5)"
                        required
                    />
                     {errors.rating && <p className="error-message">{errors.rating}</p>}
                </div>

                <div className="form-group">
                    <input
                        type="number"
                        name="stock"
                        className="form-input"
                        value={formValues.stock}
                        onChange={setFieldValue}
                        placeholder="Tồn kho"
                        required
                    />
                     {errors.number && <p className="error-message">{errors.number}</p>}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="tags"
                        className="form-input"
                        //input chỉ nhận chuỗi không nhận mảng
                        value={formValues.tags.join(", ")}
                        onChange={setFieldValue}
                        placeholder="Tags (cách nhau bằng dấu phẩy)"
                        required
                    />
                     {errors.tags && <p className="error-message">{errors.tags}</p>}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="brand"
                        className="form-input"
                        value={formValues.brand}
                        onChange={setFieldValue}
                        placeholder="Thương hiệu"
                        required
                    />
                     {errors.brand && <p className="error-message">{errors.brand}</p>}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="sku"
                        className="form-input"
                        value={formValues.sku}
                        onChange={setFieldValue}
                        placeholder="Mã SKU"
                        required
                    />
                     {errors.sku && <p className="error-message">{errors.sku}</p>}
                </div>

                <div className="form-group">
                    <input
                        type="number"
                        name="weight"
                        className="form-input"
                        value={formValues.weight}
                        onChange={setFieldValue}
                        placeholder="Trọng lượng (kg)"
                        required
                    />
                     {errors.weight && <p className="error-message">{errors.weight}</p>}
                </div>

                <div className="form-group">
                    <input
                        type="number"
                        name="minimumOrderQuantity"
                        className="form-input"
                        value={formValues.minimumOrderQuantity}
                        onChange={setFieldValue}
                        placeholder="Số lượng tối thiểu"
                        required
                    />
                     {errors.minimumOrderQuantity && <p className="error-message">{errors.minimumOrderQuantity}</p>}
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="thumbnail"
                        className="form-input"
                        value={formValues.thumbnail}
                        onChange={setFieldValue}
                        placeholder="URL hình ảnh"
                        required
                    />
                     {errors.thumbnail && <p className="error-message">{errors.thumbnail}</p>}
                </div>
          
        <button type="submit" className="submit-button">
            {submitTitle}
        </button>
    </form>
</div>

    );
};

export default ProductForm;
