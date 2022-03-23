import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="grid">
            <div className="footer_1">
              <h3>A PROPOS</h3>
              <p>Développeur Web Junior</p>
            </div>
            <div>
              <h3>NAVIGATION</h3>
              <p>Accueil</p>
              <p>A Propos</p>
              <p>Articles</p>
              <p>Contact Us</p>
            </div>
            <div>
              <h3>DEVELOPPEUR WEB JUNIOR</h3>
              <p>Front End</p>
              <p>Back End</p>
            </div>
         
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
