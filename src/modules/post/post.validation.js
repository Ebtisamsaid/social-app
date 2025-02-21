import Joi from "joi";
import { filevalidation } from "../../utils/file uploading/multer.upload.js";
import { isValidObjectId, Types } from "mongoose";

export const creatpostval=Joi.object({
    text:Joi.string().min(2),
    file:Joi.array().items(Joi.object({
        fieldname:Joi.string().valid("images").required(),
        originalname: Joi.string().required(),
        filename: Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().required(),
        destination:Joi.string().required(),
        path:Joi.string().required(),
        size:Joi.number().required(),
        
    }))

}).or("text","file")
export const filevalid ={
    fieldname:Joi.string().valid("image").required(),
    originalname: Joi.string().required(),
    filename: Joi.string().required(),
    encoding:Joi.string().required(),
    mimetype:Joi.string().required(),
    destination:Joi.string().required(),
    path:Joi.string().required(),
    size:Joi.number().required(),
    
}

export const updatepost=Joi.object({
    text:Joi.string().min(2),
    file:Joi.array().items(Joi.object({
        fieldname:Joi.string().valid("images").required(),
        originalname: Joi.string().required(),
        filename: Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().required(),
        destination:Joi.string().required(),
        path:Joi.string().required(),
        size:Joi.number().required(),
        
    })),
    id:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value)){
            return true
        }return helper.message("invalid id")
    }).required()

}).or("text","file")



export const softdeleted=Joi.object({
    id:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value)){
            return true
        }return helper.message("invalid id ")

    }).required()
}).required()
export const restorepost=Joi.object({
    id:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value)){
            return true
        }return helper.message("invalid id")

    }).required()
}).required()
export const getsinglepost=Joi.object({
    id:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value)){
            return true

        }return helper.message("invalid id")
    }).required()
}).required()



export const likeunlike=Joi.object({
    id:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value)){
            return true

        }return helper.message("invalid id")
    }).required()
}).required()