import { AiFillAliwangwang } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import MainSlide from "./MainSlide";
import MdPick from "./MdPick";
import { Link } from "react-router-dom";
import Magazine from "./Magazine";
import axios from "axios";
import { API_URL } from "../config/constants";
const MainPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let url = `${API_URL}/products`;
    axios
      .get(url)
      .then((result) => {
        const products = result.data.product;
        setProducts(products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(products);
  return (
    <div>
      <MainSlide />
      <MdPick />
      <div className="banner">
        <p>lorem lorem</p>
      </div>
      <div className="products">
        <h2>Products</h2>
        <div id="product-list" className="p-list">
          {products.map((product) => {
            return (
              <div className="product-card" key={product.id}>
                {product.soldout === 1 ? <div className="product-blur"></div> : null}
                <Link className="product-link" to={`/ProductPage/${product.id}`}>
                  <div>
                    <img src={`${API_URL}/${product.imageUrl}`} alt="" className="product-img" />
                  </div>
                  <div className="product-contenst">
                    <span className="product-name">{product.name}</span>
                    <span className="product-price">{product.price}</span>
                    <div className="product-seller">
                      <AiFillAliwangwang className="product-avatar" />
                      <span className="seller">{product.seller}</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <Magazine />
    </div>
  );
};

export default MainPage;
