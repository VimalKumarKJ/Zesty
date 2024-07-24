import express, { json, urlencoded } from "express";
import cors from "cors";
import 'dotenv/config'

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//get all restaurants
app.get("/api/v1/restaurants", (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            restaurant: "Anjapper"
        }
        
    })
});

//get a particular restaurant
app.get("/api/v1/restaurants/:id", (req, res) => {
    const id = req.params;
    console.log(id);
    res.status(200).json({
        status: "success",
        data: {
            restaurant: "Anjapper"
        }
        
    })
});

//post a restaurant
app.post("/api/v1/restaurants", (req, res) => {
    const response = req.body;
    console.log(response);
    res.status(201).json({
        status: "success",
        data: {
            restaurant: "Anjapper"
        }
        
    })
});

app.put("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.body);  
    res.status(201).json({
        status: "success",
        data: {
            restaurant: "Anjapper"
        }
        
    })
});

app.delete("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    res.status(201).json({
        status: "success",
        data: {
            restaurant: "Anjapper"
        }
        
    })
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});