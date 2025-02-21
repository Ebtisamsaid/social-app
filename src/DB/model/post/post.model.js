import mongoose, { Schema } from "mongoose";
import { Types } from "mongoose";

// schema
const postSchema=new Schema({
    text:{type:String,minLength:2,required:function(){
        return this.images.length?false:true
    }},
    images:[{secure_url:String,public_id:String}],
    isDeleted:{type:Boolean,default:false},
user:{type:Types.ObjectId,ref:"User",required:true},
likes:[{type:Types.ObjectId,ref:"User"}],
deletedBy:{type:Types.ObjectId,ref:"User"},
cloudfolder:{type:String,unique:true,required:function(){
    return this.images.length?true:false
}}

},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}
})

// model
postSchema.virtual("comments",{
    ref:"comment",
    localField:"_id",
    foreignField:"post"
})
 const Post=mongoose.model("post",postSchema)

 export default Post