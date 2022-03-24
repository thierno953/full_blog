import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <div className="container flex_space">
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fa-solid fa-bars"}></i>
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li>
              <Link to="/" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMobileMenu}>
                About
              </Link>
            </li>
            
          <li>
              <Link to="/addBlog" onClick={closeMobileMenu} className="none">
                Blog
              </Link>
            </li> 
          </ul>

          <div className="login-area flex">
            <li>
              <i className="fa-solid fa-arrow-right-to-bracket">
              </i>
              <Link to="/contact" onClick={closeMobileMenu}>
                  Contact
                </Link>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
