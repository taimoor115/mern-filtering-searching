import { Router } from "express";
import { getMovies } from "../controller/movie.controller.js";

const router = Router();

router.route("/getMovies").get(getMovies);

export default router;
