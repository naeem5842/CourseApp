import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    contact:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    courses:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Course",
            required:true,
        }
    ]

});

export default mongoose.model("User", userSchema);