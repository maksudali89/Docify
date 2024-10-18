import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
const secret = '/mak@90#';
export async function handlerForUserSignup(req, res) {
  const { username, name, email, phone, password } = req.body;
  // console.log(req.body);
  let emailCo = await User.findOne({ email });
  let phoneCo = await User.findOne({ phone });
  if (emailCo) {
    return res.json({ success: false, message: "User Email Already Exits" });
  } else if (phoneCo) {
    return res.json({ success: false, message: "Phone Number Already Exits" });
  } else {
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password,salt);
        User.create({
            username:username,
            name:name,
            email:email,
            phone:phone,
            password:hash
        });
        res.json({success:true,message:'USER created Success'})
};

};


export async function handlerForUserLogin(req,res) {
  const {email,password} = req.body;

  let user  =  await User.findOne({email:email});
  if(user){
    bcryptjs.compare(password,user.password,(err,result)=>{
      if(result){
          var token = jwt.sign({email:email,userId:user._id},secret);
          res.json({success:true,message:"Login SuccessFully",userId:user._id,token:token})
      }else{
        res.json({success:false,message:"Invalid Password"});
      }
    });
  
  }else{
    res.json({success:false,message:"Invalid Password"});
  }
 
};

export async function HandlerForGetUsers(req,res) {
  const userId  = req.query.userId;
  const user =  await User.findById(userId);
  if(user){
    return res.json({success:true,message:"user fetched Successfully",user:user})
  }else{
    return res.json({success:false,message:"InValid User"})
  }
  
}