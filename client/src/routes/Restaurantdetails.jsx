import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../Apis/RestaurantFinder";
import { RestaurantContext } from "../Context/RestaurantContext";
import Reviews from "../Components/Reviews";
import AddReview from "../Components/AddReview";
import StarRating from "../Components/StarRating";

const Restaurantdetails = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);
  console.log(selectedRestaurant);

  return (
    <div className="container">
      {selectedRestaurant && (
        <>
          <h1 className="display-1 mb-4">
            {selectedRestaurant.restaurant.name}
          </h1>
          {!selectedRestaurant.restaurant.count ? (
            <div className="text-center">
              <h5>Oops! no reviews yet, be the first one to review this place</h5>
            </div>
          ) : (
            <div className="text-center">
              <StarRating
                rating={selectedRestaurant.restaurant.average_rating}
              />
              <span>({selectedRestaurant.restaurant.count})</span>
            </div>
          )}

          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default Restaurantdetails;
