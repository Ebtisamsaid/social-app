import Joi from "joi";
import { Types } from "mongoose";
import { filevalid } from "../post/post.validation.js";

export const createComment=Joi.object({
    text:Joi.string()  ,
    file:Joi.object(filevalid)   ,
    postId: Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value))return true
        return helper.message("invalid id")
    }).required()  ,
  
}).or("file","text")



export const updatecomment=Joi.object({
    id:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value))return true
        return helper.message("invalid id")
    }).required()  ,
    text:Joi.string()  ,
    file:Joi.object(filevalid)   ,
    postId: Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value))return true
        return helper.message("invalid id")
    }).required()  ,
  
}).or("file","text")

export const deletecomment=Joi.object({
    id:Joi.custom((value,helper)=>{
    if(Types.ObjectId.isValid(value))return true
    return helper.message("invalid id")
}).required()  }).required()

export const getAllcomment=Joi.object({
   postId:Joi.custom((value,helper)=>{
    if(Types.ObjectId.isValid(value))return true
    return helper.message("invalid id")
}).required()  }).required()
export const likeunlikecomment=Joi.object({
    id:Joi.custom((value,helper)=>{
     if(Types.ObjectId.isValid(value))return true
     return helper.message("invalid id")
 }).required()  }).required()
 export const addreply=Joi.object({
    id:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value))return true
        return helper.message("invalid id")
    }).required()  ,
    text:Joi.string()  ,
    file:Joi.object(filevalid)   ,
    postId: Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value))return true
        return helper.message("invalid id")
    }).required()  ,
  
}).or("file","text")

export const hardDelete=Joi.object({
    id:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value))return true
        return helper.message("invalid id")
    }).required()  
})