import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductPage.scss";
import { Button, message } from "antd";
import { API_URL } from "../config/constants";
import dayjs from "dayjs";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPurchaseDisabled, setPurchaseDisabled] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((result) => {
        setProduct(result.data.product);
        setLoading(false);
        setPurchaseDisabled(result.data.product.soldout === 1);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then(() => {
        message.info(`결제가 완료되었습니다.`);
        getProduct();
      })
      .catch((error) => {
        message.error(`에러가 발생했습니다: ${error.message}`);
      });
  };

  const onClickDelete = () => {
    axios
      .delete(`${API_URL}/products/${id}`)
      .then(() => {
        message.info(`제품이 삭제되었습니다.`);
        navigate(-1); // 삭제 후, 뒤로 가기
      })
      .catch((error) => {
        message.error(`에러가 발생했습니다: ${error.message}`);
      });
  };

  if (loading) {
    return <h2>제품 상품 정보를 받고 있습니다.....</h2>;
  }

  return (
    <div className="product-wrap">
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
            <Button type="primary" danger className="payment" size="large" onClick={onClickPurchase} disabled={isPurchaseDisabled}>
              즉시 결제 하기
            </Button>
            <Button type="primary" danger className="delete" size="large" onClick={onClickDelete}>
              제품 삭제하기
            </Button>
            <div id="description">{product.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
