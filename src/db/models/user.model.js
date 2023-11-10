import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fist_Name :{
        type:String,
        require:true
    },
    last_Name :{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    age : {
        type: Number,
        require: true,
        max : 99,
        min : 0
    },
    password:{
        type: String,
        require: true
    },
    role : {
        type:String,
        default:"User"
    },
    
})


export const userModel = new mongoose.model("users",userSchema)
