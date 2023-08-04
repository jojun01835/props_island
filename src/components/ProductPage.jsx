import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductPage.scss";
import { API_URL } from "../config/constants";
import dayjs from "dayjs";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((result) => {
        setProduct(result.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(product);
  if (product === null) {
    return <h2>제품 상품 정보를 받고 있습니다.....</h2>;
  }
  return (
    <div>
      <button onClick={() => navigate(-1)} id="back-btn">
        뒤로가기
      </button>
      <div id="image-box">
        <img src={`${API_URL}/${product.imageUrl}`} alt={product.name}></img>
        <div id="profile-box">
          <img src="/img/icons/icon.png" alt={product.seller} />
          <span className="product-seller">{product.seller}</span>
          <div id="content-box">
            <div id="name">{product.name}</div>
            <div id="price">{product.price}</div>
            <div id="crateAt">{dayjs(product.createdAt).format("YYYY MM DD")}</div>
            <div id="description">{product.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
