// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
