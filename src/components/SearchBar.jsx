import React from "react";
import "../css/SearchBar.css";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="search-box">
      <img src="search-icon.png" alt="Search" className="search-icon" />
      <input
        type="text"
        placeholder="Search menu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
        autoComplete="off"
      />
    </div>
  );
};

export default SearchBar;
