import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const activeStyle = {
    color: "gray",
  };
  return (
    <nav className="nav">
      <ul className="listWrap">
        <li>
          <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/Interior" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Interior
          </NavLink>
        </li>
        <li>
          <NavLink to="/Cook" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Cook
          </NavLink>
        </li>
        <li>
          <NavLink to="/Office" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Office
          </NavLink>
        </li>
        <li>
          <NavLink to="/Fabric" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Fabric
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
