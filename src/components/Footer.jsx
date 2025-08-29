import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <div className="frame-footer">
      <div className="contact-us">CONTACT US</div>
      <div className="contact-container">
        <div className="goth-contactInfo">
          Göteborg
          <br />
          Tel: +46010101
          <br />
          Email: res@mail.com
        </div>
        <div className="malm-contactInfo">
          Malmö
          <br />
          Tel: +46010101
          <br />
          Email: res@mail.com
        </div>
      </div>
    </div>
  );
};

export default Footer;
