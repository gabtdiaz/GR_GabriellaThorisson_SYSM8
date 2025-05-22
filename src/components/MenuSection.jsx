// src/components/MenuSection.jsx
import React from "react";
import "../css/MenuSection.css";

const MenuSection = () => {
  return (
    <div className="the-menu">
      <div className="frame-11">
        <div className="our-menu">Vår Meny</div>
        <div className="our-menu-is-inspired-by-authentic-mexican-cuisine-we-have-a-menu-that-showcases-our-favorite-tacos-and-sides-our-corn-is-100-mexican">
          Vår meny är inspirerad av autentisk mexikansk matlagning.
          <br />
          Vi har en meny som visar våra favoritpacos och tillbehör.
          <br />
          Vår majs är 100% mexikansk.
        </div>
        <div className="check-out-our-locations">Kolla in våra platser</div>
      </div>

      <div className="location-cards">
        <div className="frame-13">
          <img
            className="food-img-2"
            src="/outdoorimg2.jpg"
            alt="Bild från Göteborg-restaurangen"
          />
          <div className="g-teborg">
            <div className="gothenburg">Göteborg</div>
          </div>
        </div>

        <div className="frame-12">
          <img
            className="food-img-1"
            src="/outdoorimg2.jpg"
            alt="Bild från Malmö-restaurangen"
          />
          <div className="malm">
            <div className="malmo">Malmö</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
