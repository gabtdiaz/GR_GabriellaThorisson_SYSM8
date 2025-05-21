// src/components/MenuSection.jsx
import React from "react";
import "../css/MenuSection.css"; // Vi kommer att skapa en separat CSS för denna sektion

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

      <div className="frame-13">
        <img
          className="food-img-2"
          src="/food-img-20.png"
          alt="Mat från Göteborg-restaurangen"
        />
        <div className="g-teborg">
          <div className="gothenburg">Göteborg</div>
        </div>
      </div>

      <div className="frame-12">
        <img
          className="food-img-1"
          src="/food-img-10.png"
          alt="Mat från Malmö-restaurangen"
        />
        <div className="malm">
          <div className="malmo">Malmö</div>
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
