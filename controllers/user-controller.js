import User from "../model/User";
import Course from "../model/Course";
export const getAllUsers = async (req, res, next)=>{
    let users;
    try {
        users = await User.find()
    } catch (err) {
        return res.status(500).json({messege:err});
    }
    if(!users){
        return res.status(404).json({messege:"No users found"});
    }
    return res.status(200).json(users);
}

export const addUser = async (req, res, next)=>{
    const {name, email, contact} = req.body;

    let userAlreadyExist;
    
    try {
        userAlreadyExist = await User.findOne({email});
    } catch (err) {
        return res.status(500).json(err);
    }
    if(userAlreadyExist){
        return res.status(400).json({messege:"user already exist"});
    }

    const user = new User({
        name,
        email,
        contact,
    });
    try {
        await user.save();
    } catch (err) {
        return res.status(500).json(err);
    }
    return res.status(201).json({messege:"successfully Registered"});
}

export const viewenrolledCourse = async(req, res, next) =>{
    const userId = req.params.userId;

    let user;
    try {
        user = await User.findById(userId).populate('courses');
    } catch (error) {
        
    }
    
     const courses = user.courses;

    return res.status(200).json(courses);

}
