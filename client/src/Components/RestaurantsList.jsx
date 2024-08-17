import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../Apis/RestaurantFinder";
import { RestaurantContext } from "../Context/RestaurantContext";

const RestaurantsList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  //Use Effect should not return anything even promises
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.restaurants);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container list-group my-4">
      <table className="table table-dark table-striped">
        <thead>
          <tr className="bg-dark">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => (
              <tr key={restaurant.id}>
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{"$".repeat(restaurant.price_range)}</td>
                <td>*</td>
                <td>
                  <button className="btn btn-warning">Edit</button>
                </td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantsList;
