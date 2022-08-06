import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user-routes";
import courseRoutes from "./routes/course-routes"


mongoose.connect("mongodb+srv://admin-naeem:abcd1234@cluster0.qs1b05e.mongodb.net/course-app?retryWrites=true&w=majority", {useNewUrlParser:true})
.then(()=>{console.log("connected to database successfully")})
.catch((err)=>console.log(err))

const app = express();
const PORT = 4000 || process.env.PORT;

app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api/courses",courseRoutes);

app.listen(PORT, ()=>{console.log(`Server Started on port ${PORT}`)});