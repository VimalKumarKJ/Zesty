import React, {useState, useContext, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantFinder from "../Apis/RestaurantFinder";

const UpdateRestaurant = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price_range, setPrice_range] = useState("Sort by Price");

  useEffect(() => {
    async function fetchData() {
        const response = await RestaurantFinder.get(`/${id}`);
        setName(response.data.restaurant.name);
        setLocation(response.data.restaurant.location);
        setPrice_range(response.data.restaurant.price_range);
    }
    fetchData();

  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const updateRestaurant = await RestaurantFinder.put(`/${id}`, {
            name, 
            location, 
            price_range
        })
        navigate("/")
        console.log(updateRestaurant);
    } catch (error) {
        
    }
  }
  return (
    <div className="container">
      <h1 className="display-3">{name}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label for="exampleInputEmail1" className="mb-2">
            Restaurant Name
          </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group my-2">
          <label for="exampleInputPassword1" className="mb-2">
            Location
          </label>
          <input
            type="text"
            value={location}
            className="form-control"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group my-3">
          <label for="exampleInputPassword1" className="mb-2">
            Pricerange
          </label>
          <select name="price" className="form-select" value={price_range} onChange={(e) => setPrice_range(e.target.value)}>
            <option disabled>Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <div className="container d-flex justify-content-center">
          <button type="submit" className="btn btn-outline-dark w-50">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
