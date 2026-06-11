import dns from 'node:dns/promises';
dns.setServers(["1.1.1.1", "1.0.0.1"]);

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // ADD THIS

import userRoutes from "./routes/userRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors()); // ADD THIS
app.use(express.json());

// port
const PORT = process.env.PORT || 5000;

// ================= ROUTES =================
app.use("/api/users", userRoutes);
app.use("/api/activity", activityRoutes);

// ================= HOME ROUTE =================
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ================= DATABASE CONNECTION =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });