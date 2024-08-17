import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Restaurantdetails from "./routes/Restaurantdetails";
import Updatepage from "./routes/Updatepage";
import { RestaurantContextProvider } from "./Context/RestaurantContext";

const App = () => {
  return (
    <RestaurantContextProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<Restaurantdetails />} />
            <Route path="/restaurant/update/:id" element={<Updatepage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RestaurantContextProvider>
  );
};

export default App;
