
import mongoose, { Schema } from "mongoose";

const otpSchema=new Schema({
    otp:{type:String,required:true},
    email:{type:String,required:true}
},{timestamps:true})

otpSchema.index({createdAt:1},{expireAfterSeconds:500})
// model
const Otp=mongoose.model("otp",otpSchema)
export default Otp