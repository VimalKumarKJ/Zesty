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
        const response = await db.query("SELECT * FROM restaurants");
        console.log(response.rows);
        res.status(200).json({
            status: "success",
            response: response.rows.length,
            data: {
                restaurants: response.rows
            }
            
        })
    } catch (err) {
        console.error(err);
    }   
});

//get a particular restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const response = await db.query("SELECT * FROM restaurants WHERE id = $1;", [id]);
        res.status(200).json({
            status: "success",
            response: response.rows.length,
            data: {
                restaurant: response.rows
            }
            
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
            data: {
                restaurants: result.rows
            }
            
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
        console.log(req.body);  
        res.status(201).json({
            status: "success",
            response: result.rows.length,
            data: {
                restaurant: result.rows
            }
            
        })
    } catch (err) {
        console.error(err);
    }
});

app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.params.id);
        console.log(req.body);
        await db.query("DELETE FROM restaurants WHERE id = $1", [id]);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: "Anjapper"
            }
            
        })
    } catch (err) {
        console.error(err);
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});