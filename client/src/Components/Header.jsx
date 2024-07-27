import React, { useState } from "react";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div
      className="container"
      style={{ backgroundColor: "#1b1b1b", borderRadius: "15px" }}
    >
      <header className="d-flex align-items-center justify-content-between my-2">
        <h1 className="mx-3 text-white">Zesty</h1>
        <form className="d-flex align-items-center">
          <div
            className={`row g-2 align-items-center ${
              showSearch ? "d-flex" : "d-none d-md-flex"
            }`}
          >
            <div className="col-md-5">
              <input
                name="rName"
                type="text"
                className="form-control"
                placeholder="Restaurant name"
                aria-label="Restaurant name"
              />
            </div>
            <div className="col-md-4">
              <input
                name="location"
                type="text"
                className="form-control"
                placeholder="Location"
                aria-label="Location"
              />
            </div>
            <div className="col-md-3">
              <select
                name="price"
                className="form-select"
              >
                <option disabled>Sort by price</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
                <option value="5">$$$$$</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline-light mx-2"
            onClick={handleToggleSearch}
          >
            Add
          </button>
        </form>
      </header>
    </div>
  );
};

export default Header;
