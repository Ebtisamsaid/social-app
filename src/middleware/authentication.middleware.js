import User from "../DB/model/user/user.model.js"
import { verifyToken } from "../utils/token/token.js"

 export const isAuthentecated= async(req,res,next)=>{
    try {
        const {authorization}=req.headers
        if(!authorization || !authorization.startsWith("Bearer"))return next(new Error("token is invalid",{cause:404}))
    const token =authorization.split(" ")[1]
const{email,id,iat}= verifyToken(token,process.env.jwt_secret)
const user =await User.findById(id).lean()
if(!user)return next(new Error ("user not found",{cause:400}))
if(user?.isDelete)return next(new Error ("user is deleted",{cause:400}))

    req.user=user
    next()
        } catch (error) {
        next(error)
    }
}