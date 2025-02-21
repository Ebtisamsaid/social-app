import mongoose, { Schema, Types } from "mongoose";
import cloudinary from "../../../utils/file uploading/multer.cloudinary.config.js";

// schema
const commentSchema=new Schema({
    post:{type:Types.ObjectId,ref:"Post",required:true},
    user:{type:Types.ObjectId,ref:"User",required:true},
    text:{type:String,required:function(){
        return this.image?false:true
    }},
    image:{secure_url:String,public_id:String},
    isDeleted:{type:Boolean,default:false},
    deletedBy:{type:Types.ObjectId,ref:"User"},
    likes:[{type:Types.ObjectId,ref:"User"}],
    parentcomment:{type:Types.ObjectId,ref:"Comment"}



},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}})

commentSchema.virtual("replies",{
    ref:"comment",
    localField:"_id",
    foreignField:"parentcomment"
})
commentSchema.post("deleteOne",{query:false,document:true},async function(doc,next){
    if(doc.image.secure_url){
        await cloudinary.uploader.destroy(doc.image.public_id)
    }
const parentcomment=doc._id
const replies=await this.constructor.find({parentcomment})


if(replies.length){
    for (const reply of replies) {
        await reply.deleteOne()
        
    }
    
}
next()
})
// model
const Comment =mongoose.model("comment",commentSchema)
export default Comment