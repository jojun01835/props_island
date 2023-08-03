import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgSoftwareDownload } from "react-icons/cg";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import NavBar from "./NavBar";
import { CSSTransition } from "react-transition-group";
import "./DropdownMenu.css";

const Header = () => {
  const [icon, setIcon] = useState(true);
  const navigte = useNavigate();
  const toggleMenu = () => {
    setIcon((preIcon) => !preIcon);
  };
  useEffect(() => {
    console.log("Navbar is render");
  }, [icon]);

  return (
    <header className="header">
      <div className="container">
        <h1>
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
        </h1>
        <NavBar />
        <div className="mobileBar">
          {icon ? <GiHamburgerMenu className="hamburgerIcon" onClick={toggleMenu} /> : <AiOutlineClose className="closeIcon" onClick={toggleMenu} />}
          <CSSTransition in={!icon} timeout={300} classNames="menu" unmountOnExit>
            <NavBar />
          </CSSTransition>
        </div>
        <button
          className="btn"
          onClick={() => {
            navigte("/UploadPage");
          }}
        >
          <CgSoftwareDownload />
        </button>
      </div>
    </header>
  );
};

export default Header;

//https://ada8b2a4-ab8c-4996-abcb-b1bf5a08cb4a.mock.pstmn.io
/* {
  "products" : [
      {"name" : "독버섯 조명", "price" : 89000, "seller" : "유니스의 정원", "imageUrl" : "img/products/products01.jpg"},
      {"name" : "허리박살의자", "price" : 819000, "seller" : "유니스의 정원", "imageUrl" : "img/products/products02.jpg"},
      {"name" : "구불구불거울", "price" : 1809000, "seller" : "더휴먼", "imageUrl" : "img/products/products03.jpg"}
  ]
} */
