import path from "path";
import User, { defaultcloudpic, defaultpic } from "../../DB/model/user/user.model.js"
import fs from "fs"
import cloudinary from "../../utils/file uploading/multer.cloudinary.config.js";
export const profilepic= async(req,res,next)=>{
    console.log( req.user);
    
    const user=await User.findByIdAndUpdate(req.user._id,{profilepic:req.file.path},{new:true})
    return res.status(200).json({success:true,result:user})
}
export const delprofilepic=async(req,res,next)=>{
    const user=await User.findById(req.user._id)
    const imgpath=path.resolve(".",user.profilepic)
    fs.unlinkSync(imgpath)
    user.profilepic=defaultpic
   await  user.save()
    return res.status(200).json({success:true,result:user})
}




// add pic by cloudinary 
export const profilepic2=async(req,res,next)=>{
    const user =await User.findById(req.user._id)
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`social app/users/${req.user._id}`})
  user.profilepic2={secure_url,public_id}
   await user.save()
    return res.status(200).json({results:user})

}
export const delprofilepic2=async(req,res,next)=>{
    const user =await User.findById(req.user._id)
    const results =await cloudinary.uploader.destroy(user.profilepic2.public_id)
    if (results.result == "ok"){
        user.profilepic2={
            secure_url:defaultcloudpic.secureurlDefault,
            public_id:defaultcloudpic.publicidDefault
        }
    }
   
    await user.save()
 
    return res.status(200).json({results:user })

}