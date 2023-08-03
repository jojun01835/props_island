import { AiFillAliwangwang } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import MainSlide from "./MainSlide";
import MdPick from "./MdPick";
import { Link } from "react-router-dom";
import Magazine from "./Magazine";
import Header from "./Header";
import axios from "axios";
import ProductPage from "./ProductPage";

const MainPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let url = "http://localhost:8080/products";
    axios
      .get(url)
      .then((result) => {
        const products = result.data.products;
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
          {products.map((product, idx) => {
            return (
              <Link className="product-link" to={`/ProductPage/${idx}`}>
                <div className="product-card" key={idx}>
                  <div>
                    <img src={product.imageUrl} alt="" className="product-img" />
                  </div>
                  <div className="product-contenst">
                    <span className="product-name">{product.name}</span>
                    <span className="product-price">{product.price}</span>
                    <div className="product-seller">
                      <AiFillAliwangwang className="product-avatar" />
                      <span className="seller">{product.seller}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Magazine />
    </div>
  );
};

export default MainPage;
