import express from "express";
import { getAllUsers, addUser,viewenrolledCourse } from "../controllers/user-controller";

const userRoutes = express.Router();


userRoutes.get("/", getAllUsers);
userRoutes.post("/add", addUser);
userRoutes.get("/enrolled/:userId", viewenrolledCourse);



export default userRoutes;