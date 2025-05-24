import React, { useState } from "react";
import "../css/MenuItemModal.css";

const MenuItemModal = ({ isOpen, onClose, item }) => {
  const [quantity, setQuantity] = useState(1);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addToCart = () => {
    console.log(`Added ${quantity} ${item?.name} to cart`);
    onClose();
    setQuantity(1);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${isOpen ? "active" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="clicked-menu-item-card">
        <div
          className="frame-26"
          style={{
            background:
              item?.image || "linear-gradient(135deg, #ff6b6b, #ffa500)",
          }}
        >
          <svg
            className="close"
            onClick={onClose}
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <rect width="40" height="40" rx="20" fill="white" />
            <path
              d="M10.6667 31.6666L8.33337 29.3333L17.6667 19.9999L8.33337 10.6666L10.6667 8.33325L20 17.6666L29.3334 8.33325L31.6667 10.6666L22.3334 19.9999L31.6667 29.3333L29.3334 31.6666L20 22.3333L10.6667 31.6666Z"
              fill="#1d1b20"
            />
          </svg>
        </div>

        <div className="frame-31">
          <div className="add-remove-btns-frame">
            <div className="frame-34">
              <div className="add-remove">
                <div className="frame-30">
                  <svg
                    className="outline-24-px-minus-circle"
                    onClick={decreaseQuantity}
                    width="30"
                    height="31"
                    viewBox="0 0 30 31"
                    fill="none"
                  >
                    <path
                      d="M10 14.25C9.30964 14.25 8.75 14.8096 8.75 15.5C8.75 16.1904 9.30964 16.75 10 16.75H20C20.6904 16.75 21.25 16.1904 21.25 15.5C21.25 14.8096 20.6904 14.25 20 14.25H10Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15 1.75C7.40608 1.75 1.25 7.90608 1.25 15.5C1.25 23.0939 7.40608 29.25 15 29.25C22.5939 29.25 28.75 23.0939 28.75 15.5C28.75 7.90608 22.5939 1.75 15 1.75ZM3.75 15.5C3.75 9.2868 8.7868 4.25 15 4.25C21.2132 4.25 26.25 9.2868 26.25 15.5C26.25 21.7132 21.2132 26.75 15 26.75C8.7868 26.75 3.75 21.7132 3.75 15.5Z"
                      fill="white"
                    />
                  </svg>
                  <div className="quantity">{quantity}</div>
                  <svg
                    className="outline-24-px-plus-circle"
                    onClick={increaseQuantity}
                    width="30"
                    height="31"
                    viewBox="0 0 30 31"
                    fill="none"
                  >
                    <path
                      d="M15 9.25C15.6904 9.25 16.25 9.80964 16.25 10.5V14.25H20C20.6904 14.25 21.25 14.8096 21.25 15.5C21.25 16.1904 20.6904 16.75 20 16.75H16.25V20.5C16.25 21.1904 15.6904 21.75 15 21.75C14.3096 21.75 13.75 21.1904 13.75 20.5V16.75H10C9.30964 16.75 8.75 16.1904 8.75 15.5C8.75 14.8096 9.30964 14.25 10 14.25H13.75V10.5C13.75 9.80964 14.3096 9.25 15 9.25Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.25 15.5C1.25 7.90608 7.40608 1.75 15 1.75C22.5939 1.75 28.75 7.90608 28.75 15.5C28.75 23.0939 22.5939 29.25 15 29.25C7.40608 29.25 1.25 23.0939 1.25 15.5ZM15 4.25C8.7868 4.25 3.75 9.2868 3.75 15.5C3.75 21.7132 8.7868 26.75 15 26.75C21.2132 26.75 26.25 21.7132 26.25 15.5C26.25 9.2868 21.2132 4.25 15 4.25Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
              <div className="addtocart-btn" onClick={addToCart}>
                <div className="add-to-cart">Add to cart</div>
              </div>
            </div>
          </div>
        </div>

        <div className="frame-33">
          <div className="frame-21">
            <div className="combo-plate">{item?.name || "Combo plate"}</div>
            <div className="frame-19">
              <div className="a-combo-of-three-different-types-of-tacos">
                {item?.description ||
                  "A combo of three different types of tacos"}
              </div>
            </div>
            <div className="frame-20">
              <div className="_90-sek">{item?.price || "90 SEK"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemModal;
