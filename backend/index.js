import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import movieRoute from "./route/movie.route.js";
import connectDatabase from "./db/index.js";
dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/api", movieRoute);

const PORT = 3000;

connectDatabase(process.env.MONGO_URL);
app.listen(PORT, () => {
  console.log(`Server is working on port ${PORT}`);
});
