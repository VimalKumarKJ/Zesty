import React, { useState, useContext } from "react";
import RestaurantFinder from "../Apis/RestaurantFinder";
import { RestaurantContext } from "../Context/RestaurantContext";

const Header = (props) => {
  const {addRestaurants} = useContext(RestaurantContext);
  const [showSearch, setShowSearch] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price_range, setPrice_range] = useState("Sort by Price");

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range
      });
      if (response.data.restaurants) {
        addRestaurants(response.data.restaurants);
        setName("");
        setLocation("");
        setPrice_range("Sort by Price");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      className="container"
      style={{ backgroundColor: "#1b1b1b", borderRadius: "15px" }}
    >
      <header className="d-flex align-items-center justify-content-between my-2">
        <h1 className="mx-3 text-white">Zesty</h1>
        <form className="d-flex align-items-center" action="" onSubmit={handleSubmit}>
          <div
            className={`row g-2 align-items-center ${
              showSearch ? "d-flex" : "d-none d-md-flex"
            }`}
          >
            <div className="col-md-5">
              <input
                name="rName"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="form-control"
                placeholder="Restaurant name"
                aria-label="Restaurant name"
              />
            </div>
            <div className="col-md-4">
              <input
                name="location"
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="form-control"
                placeholder="Location"
                aria-label="Location"
              />
            </div>
            <div className="col-md-3">
              <select
                name="price"
                className="form-select"
                value={price_range}
                onChange={e => setPrice_range(e.target.value)}
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
            type="submit"
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
