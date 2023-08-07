// ProductPage.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductPage.scss";
import { Button, message, Input, Modal } from "antd";
import { API_URL } from "../config/constants";
import dayjs from "dayjs";
import bcrypt from "bcryptjs";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPurchaseDisabled, setPurchaseDisabled] = useState(false);
  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [masterPassword, setMasterPassword] = useState("whwnsdud!"); // 마스터 암호 추가

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
    setPassword("");
    setPasswordError(false);
    setPasswordModalVisible(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    // 클라이언트에서 비밀번호를 암호화하여 서버로 전송합니다.
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return;
      }

      axios
        .post(`${API_URL}/products/${id}/verify-password`, { password: hashedPassword }) // 암호화된 비밀번호를 전송합니다.
        .then(() => {
          // 마스터 암호를 검증합니다.
          bcrypt.compare(masterPassword, password, (err, result) => {
            if (err) {
              console.error(err);
              return;
            }

            if (result) {
              // 비밀번호가 맞으면 서버에서 제품을 삭제합니다.
              axios
                .delete(`${API_URL}/products/${id}`, { data: { password: hashedPassword } }) // 암호화된 비밀번호를 전송합니다.
                .then(() => {
                  message.info(`제품이 삭제되었습니다.`);
                  setPasswordModalVisible(false);
                  navigate(-1);
                })
                .catch((error) => {
                  message.error(`에러가 발생했습니다: ${error.message}`);
                });
            } else {
              // 비밀번호가 틀리면 에러 처리합니다.
              setPasswordError(true);
            }
          });
        })
        .catch(() => {
          // 비밀번호가 틀리면 에러 처리합니다.
          setPasswordError(true);
        });
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
            <Modal title="비밀번호 입력" visible={isPasswordModalVisible} onCancel={() => setPasswordModalVisible(false)} onOk={handlePasswordSubmit}>
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={handlePasswordChange}
                className={passwordError ? "error" : ""}
              />
              {passwordError && <p className="error-text">비밀번호가 틀렸습니다.</p>}
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
