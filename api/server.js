// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import favoritesRoute from "./routes/favorites.route.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";
import movieRoutes from "./routes/movies.route.js";
import tvRoutes from "./routes/tv.route.js";

dotenv.config();

const port = parseInt(process.env.PORT || "3000", 10);
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  }),
);

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/favorites", favoritesRoute);
app.use("/api/movies", movieRoutes);
app.use("/api/tv", tvRoutes);
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);

app
  .listen(port, async () => {
    await connectToDatabase();
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Backend allowed client: ${process.env.CLIENT_URL}`);
  })
  .on("error", (err) => {
    if (err.code === "EACCES") {
      console.log(`Port ${port} requires elevated privileges.`);
    } else {
      console.error("Server error:", err);
    }
  });
