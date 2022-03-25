import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="grid">
            <div className="footer_1">
              <h3>About</h3>
              <p>Juinior Web Developer</p>
            </div>
            <div>
              <h3>NAVIGATION</h3>
              <p>Home</p>
              <p>About</p>
              <p>Blog</p>
              <p>Contact Us</p>
            </div>
            <div>
              <h3>Language & Framework</h3>
              <p>Html</p>
              <p>Css</p>
              <p>JavaScript</p>
              <p>React</p>
            </div>
         
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
