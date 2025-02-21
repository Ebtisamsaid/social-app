import User, { providers } from "../../DB/model/user/user.model.js"
import { ciphertext } from "../../utils/encryption/encrypt.js"
import { compare, hash } from "../../utils/hash/hash.js"
import { eventEmitter } from "../../utils/sendEmail/email.event.js"
import Otp from "../../DB/model/otp.model.js"
import Randomstring  from "randomstring"
import { generateToken, verifyToken } from "../../utils/token/token.js"
import { sendEmails, subject } from "../../utils/sendEmail/sendEmail.js"
import { OAuth2Client } from "google-auth-library"
import { generateUrl } from "../../utils/sendEmail/generateUrl.js"

export const register=async(req,res,next)=>{
 

    
 
    const{email,userName,phone,password,role,otp}=req.body
    const otpExist=await Otp.findOne({otp,email})
    if(!otpExist)return next(new Error ("invalid otp",{cause:400}))
        const user=   await User.create({...req.body,password: hash({plaintetxt:password}),phone: ciphertext({encryptText:phone}),isAcctivate:true,provider:providers.system})
 

    if(!user)return next(new Error("user not created ",{cause:400}))
    return res.status(200).json({
success:true,message:"user created successfully",user})

}
export const  sendOtp=async(req,res,next)=>{
    const {email}=req.body
    const user=await User.findOne({email})
    if(user)return next(new Error ("email is already exist",{cause:400}))

const otp=Randomstring.generate({length:4,charset:'alphanumeric'})
const savedotp=await Otp.create({email,otp})

eventEmitter.emit("sendEmail",email,otp,{subject:subject.register, html:generatehtml(otp)})
return res.status(200).json({message:"send otp successfully"})
}
export const login =async(req,res,next)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user) return next (new Error (" invalid email",{cause:400}))
        if(!user.isAcctivate) return next(new Error ("you must acctivate your account first",{cause:400}))
const match=await compare({plaintetxt:req.body.password,hash:user.password})
    if(!match)  return next(new Error ("password  Incorrect",{cause:400}))
        const access_token = generateToken({payload:{email:user.email,id:user._id},options:{expiresIn:process.env.access_token_expire}})
        const refresh_token = generateToken({payload:{email:user.email,id:user._id},options:{expiresIn:process.env.refresh_token_expire}})
return res.status(200).json({success:true,message:"login is successfully",access_token:access_token,refresh_token:refresh_token})
        }
// refresh-token
export const newAccess=async(req,res,next)=>{
    const {refresh_token}=req.body
    console.log(refresh_token);
    
    const payload=verifyToken(refresh_token)
    const user=await User.findById(payload.id)
    if(!user)return next(new Error ("user not found",{cause:400}))
        if(parseInt(user.changePasswordAt.getTime /1000)>payload.iat ) { next(new Error ("invalid refresh token"))}else{
             next(new Error ("the refresh token was issued before the password was updated, plz login again"))
        }
        const access_token=generateToken({payload:{id:user._id},options:{expiresIn:process.env.access_token_expire}})
    return res.status(200).json({success:true,result:access_token})

}

export const forgetpassword=async(req,res,next)=>{
    const{email}=req.body
    const user=await User.findOne({email,isAcctivate:true,isDelete:false})
    if(!user) return next(new Error ("email invalid",{cause:400}))
        const otp =Randomstring.generate({length:4,charset:"alphanumeric"})
    const saveOtp=await Otp.create({email,otp})
    eventEmitter.emit("sendEmail",email,otp,{subject:subject.resetPass, html:generatehtml(otp)})
    return res.status(200).json({success:true,message:"otp send successfully "})
}







        export const resetPassword=async(req,res,next)=>{
            const {email,password,otp}=req.body
const user =await User.findOne({email,isAcctivate:true,isDelete:false}
)
if(!user)return  next(new Error ("email invalid",{cause:400}))
const checkOtp=await Otp.findOne({email,otp})
if(!checkOtp)return next(new Error ("otp is invalid",{cause:400}))
    user.password=hash({plaintetxt:password})
await user.save()
return res.status(200).json({message:"reset password done try to login",success:true


})
        }


        export const freeze=async(req,res,next)=>{
            const user =await User.findByIdAndUpdate(req.user._id,{isDelete:true},{new:true})
            return res.status(200).json({success:true,user})
        }

        export const gmailLogin=async(req,res,next)=>{
            const{idToken}=req.body
            const client = new OAuth2Client()
            async function verify() {
                const ticket = await client.verifyIdToken({
                    idToken: idToken,
                    audience: process.env.client_id  // Specify the WEB_CLIENT_ID of the app that accesses the backend
                    // Or, if multiple clients access the backend:
                    //[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
                });
                const payload = ticket.getPayload();
                const userid = payload['sub'];
                // If the request specified a Google Workspace domain:
                // const domain = payload['hd'];
                return payload
              }
              const userData=await verify()
              const {email_verified,email,picture,name}=userData
              if(!email_verified)return next(new Error ("email not found",{cause:400}))
                const user = await User.create({email,userName:name,isAcctivate:true,provider:providers.google})
            if(!user)return next(new Error("user is not created",{cause:400}))

                const access_token=generateToken({payload:{email:user.email,id:user._id},options:{expiresIn:process.env.access_token_expire}})
                const refresh_token=generateToken({payload:{email:user.email,id:user._id},options:{expiresIn:process.env.refresh_token_expire}})

return res.status(200).json({success:true,results:{refresh_token:refresh_token,access_token:access_token}})
        }


        export const updateEmail=async(req,res,next)=>{
            const{email,password}=req.body
            const user=await User.findById(req.user._id)
            if(!compare({plaintetxt:password,hash:user.password})) return next(new Error("password not match",{cause:400}))
user.TempEmail=email
            await user.save()
            const token=generateToken({payload:{email,id:user._id}})
            const url=`http:localhost:4000/verify-email/${token}`
            sendEmails({to:email,subject:subject.verifyEmail,html:generateUrl(url)})
            return res.status(200).json({success:true,message:"verify your email"})
        }
        export const verifyEmail=async(req,res,next)=>{
            const {token}=req.params
            const{email,id}=verifyToken(token)
            const user=await User.findById(id)
            if(!user) return next(new Error("user not found",{cause:400}))
                user.email=user.TempEmail
            user.TempEmail=null
            user.save()
            return res.status(200).json({success:true,message:"verify email successfully"})
        }
        // export const updatePassword=async(req,res,next)=>{
        //     const {old_password,new_password}=req.body
        //     if(!compare({plaintetxt:old_password,hash:user.password}))return next(new Error("old password incorresct",{cause:400}))
        //     const user=await User.findByIdAndUpdate(user._id,{password:hash({plaintetxt:new_password}),changePasswordAt:Date.now()})

        // }