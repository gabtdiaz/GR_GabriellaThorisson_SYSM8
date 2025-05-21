// src/components/Footer.jsx
import React from "react";
import "../css/Footer.css"; // Vi kommer att skapa en separat CSS för footer

const Footer = () => {
  return (
    <div className="frame-footer">
      <div className="contact-us">Kontakta oss</div>
      <div className="gothenburg-tel-46010101-email-res-mail-com">
        Göteborg
        <br />
        Tel: +46010101
        <br />
        Email: res@mail.com
      </div>
      <div className="malm-tel-46010101-email-res-mail-com">
        Malmö
        <br />
        Tel: +46010101
        <br />
        Email: res@mail.com
      </div>
    </div>
  );
};

export default Footer;
