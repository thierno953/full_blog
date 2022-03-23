import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
// import Logo from "../../assets/logo_1-new.png";

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
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/propos" onClick={closeMobileMenu}>
                A propos
              </Link>
            </li>
            
            <li>
              <Link to="/addBlog" onClick={closeMobileMenu}>
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
