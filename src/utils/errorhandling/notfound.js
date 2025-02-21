export const notfound=(req,res,next)=>{
    return next(new Error("api not found",{cause:404}))

}