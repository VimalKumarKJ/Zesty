import React, { useState, createContext } from "react";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const addRestaurants = (newRestaurants) => {
    setRestaurants((prevRestaurants) => [
      ...prevRestaurants,
      ...newRestaurants
    ]);
  }

  return (
    <RestaurantContext.Provider value={{ restaurants, setRestaurants, addRestaurants, selectedRestaurant, setSelectedRestaurant}}>
      {props.children}
    </RestaurantContext.Provider>
  );
};
