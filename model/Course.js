import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    }
    ,
    startDate:{
        type:String,
        required: true
    },
    endDate:{
        type:String,
        required:true
    },
    users :[
        {
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
    ]
});

export default mongoose.model("Course", courseSchema);