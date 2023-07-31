import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

//configure env
dotenv.config();

//database config
connectDB();

// rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
//app.use(express.static(path.join(__dirname, "./client/build")));

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to InfinityKart");
});

//PORT
const PORT = process.env.port;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white
  );
});
