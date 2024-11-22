// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import routes from "./routes/index.js";
//import MQTT Client
import { Client } from "mqtt";
import { client } from "./controllers/mqtt_controller.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Test route
app.get("/", (req, res) => {
  res.send("Hello from Express and Supabase!");
});

app.use("/", routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`server is running on http://localhost:${port}`);
});
