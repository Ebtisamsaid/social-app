import Joi from "joi";
import { roles } from "../../DB/model/user/user.model.js";

export const registervalidation=Joi.object({
userName:Joi.string().required(),
phone:Joi.string().required(),
email:Joi.string().email().required(),
role:Joi.valid(...Object.values(roles)),
password:Joi.string().required(),
confirmPassword :Joi.string().valid(Joi.ref("password")).required(),
otp:Joi.string().required()
}).required()

export const otpsenVali=Joi.object({
    email:Joi.string().email().required()
}).required()
export const loginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required()
}).required()


export const forgetpasswordSchema=Joi.object({
    email:Joi.string().email().required()

})

export const resetPasswordSchema=Joi.object({
    password:Joi.string().required(),
email:Joi.string().email().required(),
  otp:Joi.string().required()
}).required()

export const newAccessSchema = Joi.object({
    refresh_token:Joi.string().required()
}).required()

export const gmailLoginvalidation=Joi.object({
    idToken:Joi.string().required()
})
export const updateEmailvalidation=Joi.object({
    password:Joi.string().required(),
    email:Joi.string().email().required(),
}).required()
export const verifyEmail=Joi.object({
    token:Joi.string().required()
})
// export const updatePassword=Joi.object({
//     old_password:Joi.string().required(),
//     new_password:Joi.string().required(),
//     confirm_password:Joi.string().valid(Joi.ref("new_password")).required()
// }).required()