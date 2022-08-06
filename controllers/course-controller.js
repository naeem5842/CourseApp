import mongoose from "mongoose";
import Course from "../model/Course";
import User from "../model/User";


export const getAllCourses = async (req, res, next)=>{
    let courses;
    try {
        courses = await Course.find();
    } catch (err) {
        return res.status(500).json({Messege: err});
    }
    if(!courses){
       return res.status(404).json({messege:"No courses Found"});
    }
    return res.status(200).json(courses);
}

export const addCourse = async (req, res, next) =>{
    const {title, description, startDate, endDate} = req.body;
    
    // console.log(title, description);
    // let existingUser;

    // try{
    //     existingUser = await User.findById(user);
    // }catch(err){
    //     return res.status(500).json({messege:err});
    // }
    // if(!existingUser){
    //     return res.status(400).json({messege:"No such a user found"});
    // }


    const course = new Course({
        title,
        description,
        startDate,
        endDate,
    });
    
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await course.save({session});
        // existingUser.courses.push(course);
        // await existingUser.save({session});
        await session.commitTransaction();
    
        
    } catch (err) {
        
        return res.status(500).json({messege: err});
    }

    return res.status(201).json(course);

}

export const enrollCourse = async (req, res, next) =>{

    //enroll/userid/courseid
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    
    let user;
    let course;
    try {
        user = await User.findById(userId);
        course = await Course.findById(courseId);
    } catch (err) {
       return res.status(500).json({messege:err})
    }
    try {
        for(var i =0; i<user.courses.length;i++){
            if(courseId===user.courses[i].toString()){
                return res.status(400).json({messege:"You are already enrolled"});
                break;
            }
        }
       

        let date = new Date();
        let dd = `${date.getDate()<10?"0":""}${date.getDate()}`;
        let mm = `${(date.getMonth()+1)<10?"0":""}${date.getMonth()+1}`;
        let yyyy = date.getFullYear();
        let today = dd+mm+yyyy;


        if(today>course.startDate){
            return res.status(400).json({messege:"cannot enroll for the course"});
        }
    } catch (error) {
        
    }

        try{
        user.courses.push(courseId);
        await user.save();
        course.users.push(userId);
        await course.save();
        return res.status(201).json({messege:"successfully enrolled"});
        }
        catch(err){
            console.log(err)
        }
        
}

export const getEnrolledUsers = async (req, res, next) =>{
    const courseId = req.params.courseId;
    let course;

    try {
        course = await Course.findById(courseId).populate('users');
    } catch (err) {
        
    }
    const users = course.users;
    return res.status(200).json(users);
}
