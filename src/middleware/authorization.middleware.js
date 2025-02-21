import { roles } from "../DB/model/user/user.model.js"

export const isAuthorized=(endpoint)=>{
    return (req,res,next)=>{
        if(endpoint.includes(Object.values(roles)))
            
        // if(req.user.role !== roles.user)
            return next(new Error("you are not allwed",{cause:404}))
          return  next()
        
    }

}