import express, { json, response, urlencoded } from "express";
import cors from "cors";
import 'dotenv/config'
import * as db from "./db/index.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON id = reviews.restaurant_id;");
        res.status(200).json({
            status: "success",
            response: response.rows.length,
            restaurants: response.rows
            
        })
    } catch (err) {
        console.error(err);
    }   
});

//get a particular restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const restaurant = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON id = reviews.restaurant_id WHERE id = $1;", [id]);
        
        const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1;", [id]);

        res.status(200).json({
            status: "success",
            response: reviews.rows.length,
            restaurant: restaurant.rows[0],
            reviews: reviews.rows
        })
    } catch (err) {
        console.error(err);
    }
});

//post a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    try {
        const {name, location, price_range} = req.body;
        const result = await db.query("INSERT INTO restaurants(name, location, price_range) VALUES ($1, $2, $3) RETURNING *;", [name, location, price_range]);
        res.status(201).json({
            status: "success",
            response: result.rows.length,
            restaurants: result.rows
            
        })
    } catch (err) {
        console.error(err);
    }
});

//update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const {name, location, price_range} = req.body;
        const result = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *", [name, location, price_range, id]);
        res.status(201).json({
            status: "success",
            response: result.rows.length,
            restaurant: result.rows
        })
    } catch (err) {
        console.error(err);
    }
});

//Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await db.query("DELETE FROM restaurants WHERE id = $1", [id]);
        res.status(201).json({
            status: "success",            
        })
    } catch (err) {
        console.error(err);
    }
});

//add a  review
app.post("/api/v1/restaurants/:id/addreview", async (req, res) => {
    try {
        const id = req.params.id;
        const {name, review, rating} = req.body;        
        const newReview = await db.query("INSERT INTO reviews(name, rating, review, restaurant_id) VALUES ($1, $2, $3, $4) RETURNING *", [name, rating, review, id]);
        res.status(201).json({
            status: "success",
            review: newReview.rows[0],
        });
    } catch (error) {
        
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


