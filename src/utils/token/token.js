import jwt from "jsonwebtoken"

export const generateToken=({payload},signature=process.env.jwt_secret,options)=>{
    return jwt.sign(payload,signature,options)
}
export const verifyToken=(generateToken,signature=process.env.jwt_secret)=>{
    return jwt.verify(generateToken,signature)
}