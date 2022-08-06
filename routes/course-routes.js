import express from "express";
import { getAllCourses, addCourse, enrollCourse, getEnrolledUsers} from "../controllers/course-controller";

const courseRoutes = express.Router();

courseRoutes.get('/', getAllCourses);
courseRoutes.post('/add',addCourse);
courseRoutes.put('/enroll/:userId/:courseId', enrollCourse);
courseRoutes.get("/getusers/:courseId",getEnrolledUsers);



export default courseRoutes;