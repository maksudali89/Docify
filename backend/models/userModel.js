import mongoose, { Mongoose } from "mongoose";

const UserSchema =  new mongoose.Schema({
    username:{
        type:String,
    },
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    phone:{
        type:String,
    },
    password:{
        type:String,
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});


export const User = mongoose.model('user',UserSchema);