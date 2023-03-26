import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo/Logo";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <Link to="/">
          <Logo />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
