import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantFinder from "../Apis/RestaurantFinder";
import { RestaurantContext } from "../Context/RestaurantContext";
import StarRating from "./StarRating";

const RestaurantsList = (props) => {
  let navigate = useNavigate();
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  //Use Effect should not return anything even promises
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.restaurants);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurant/update/${id}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">No reviews</span>;
    }
    return (
      <>
        <StarRating rating={restaurant.average_rating} />
        <span>({restaurant.count})</span>
      </>
    );
  };
  const handleRestaurant = (id) => {
    navigate(`/restaurant/${id}`);
  };

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
              <tr
                key={restaurant.id}
                onClick={() => {
                  handleRestaurant(restaurant.id);
                }}
              >
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{"$".repeat(restaurant.price_range)}</td>
                <td>{renderRating(restaurant)}</td>
                <td>
                  <button
                    onClick={(e) => handleUpdate(e, restaurant.id)}
                    className="btn btn-warning"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={(e) => handleDelete(e, restaurant.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantsList;
