import { nanoid } from "nanoid";
import cloudinary from "../../utils/file uploading/multer.cloudinary.config.js";
import Post from "../../DB/model/post/post.model.js";
import User, { roles } from "../../DB/model/user/user.model.js";

export const createpost=async(req,res,next)=>{
    const {text}=req.body
    let images=[]
    let cloudfolder;
    if(req.files.length){
        for (const file of req.files) {
         
            
            cloudfolder=nanoid()
        const{secure_url,public_id} =   await cloudinary.uploader.upload(file.path,{folder:`social app/users/${req.user._id}/posts/${cloudfolder}`})
            images.push({secure_url,public_id})
       
          
        }

    }
    const post =await Post.create({text,images,cloudfolder,user:req.user._id})
  
    
    
    return res.status(200).json({success:true,result:{post},message:"post creat successfully"})
}

export const updatepost=async(req,res,next)=>{
    const{id}=req.params
    console.log(id);
    const{text}=req.body
    
    const post=await Post.findOne({_id:id,user:req.user._id})
    if(!post) return next("post not found",{cause:400})
        let images=[]
 if(req.files.length){
    for (const file of req.files) {
        const {secure_url,public_id}=await cloudinary.uploader.upload(file.path,{folder:`social app/users/${req.user._id}/posts/${post.cloudfolder}`})
        images.push({secure_url,public_id})

 }
 if(post.images.length){
    for (const image of post.images) {
 await   cloudinary.uploader.destroy(image.public_id)
   }

}
 post.images=images

 }
 post.text=text?text:post.text

 await post.save()
 return res.status(200).json({success:true,result:{post}
 })
}


export const softdeleted=async(req,res,next)=>{
    const{id}=req.params
    const post =await Post.findById(id)
    if(!post)return next(new Error ("post not found",{cause:400}))

        
if(post.user.toString() ==req.user._id.toString() || req.user.role == roles.admin){
    post.isDeleted=true
    post.deletedBy=req.user._id
    await post.save()
}


return res.status(200).json({success:true,result:{post}})
}

export const restorepost=async(req,res,next)=>{
    const{id}=req.params
    const post=await Post.findByIdAndUpdate({_id:id},{isDeleted:false,$unset:{deletedBy:0}},{new:true,runValidators:true})
    if(!post)return next(new Error ("post is not found",{cause:400}))
        return res.status(200).json({result:{post}})
}
export const getsinglepost=async(req,res,next)=>{
    const{id}=req.params
    const post =await Post.findOne({_id:id,isDeleted:false}).populate(
       [ {path:"user",select:" userName profilepic2.secure_url"},
        {path:"comments",select:"text image createdAt",match:{parentcomment:{$exists:false}},
            populate:[{path:"user",select:" userName profilepic2.secure_url"}, {path:"replies",select:"text image createdAt parentcomment",populate:{path:"user",select:" userName profilepic2.secure_url"}}]
                                     },
                                             ])
    if(!post)return next(new Error ("post is not found",{cause:400}))
        return res.status(200).json({success:true,result:{post}})
}
export const getallactiveposts=async (req,res,next)=>{
    console.log(req.user.role);
    
    let posts
    if(req.user.role == roles.admin){
posts=await Post.findOne({isDeleted:false}).populate([{path:"user",select:"userName profilepic2.secure_url"},{path:"comments",select:"text image createdAt",match:{parentcomment:{$exists:false}},populate:[{path:"user",select:" userName profilepic2.secure_url"},{path:"replies",select:"text image createdAt parentcomment",populate:{path:"user",select:" userName profilepic2.secure_url"}}]}])
    }else if(req.user.role == roles.user){
        posts =await Post.findOne({isDeleted:false,user:req.user._id}).populate([{path:"user",select:"userName profilepic2.secure_url"},{path:"comments",select:"text image createdAt",match:{parentcomment:{$exists:false}},populate:[{path:"user",select:" userName profilepic2.secure_url"},,{path:"replies",select:"text image createdAt parentcomment",populate:{path:"user",select:" userName profilepic2.secure_url"}}]}])

    }
    return res.status(200).json({success:true,result:{posts}})
}
export const getalldeletedposts=async (req,res,next)=>{
    console.log(req.user.role);
    
    let posts
    if(req.user.role == roles.admin){
posts=await Post.findOne({isDeleted:true}).populate({path:"user",select:"userName profilepic2.secure_url"})
    }else if(req.user.role == roles.user){
        posts =await Post.findOne({isDeleted:true,user:req.user._id}).populate({path:"user",select:"userName profilepic2.secure_url"})

    }
    return res.status(200).json({success:true,result:{posts}})
}


export const likeunlike=async(req,res,next)=>{
    const {id}=req.params
 const   userId=req.user._id
    const post=await Post.findOne({_id:id,isDeleted:false})
    if(!post)return next(new Error ("post is not exist",{cause:400}))
  const isuserExist=  post.likes.find((user)=>user.toString()==userId.toString())
if(!isuserExist){
    post.likes.push(userId)
}else{
  post.likes=  post.likes.filter((user)=>user.toString()!== userId.toString())
}
await post.save()
const populatepost=await Post.findOne({_id:id,isDeleted:false}).populate({path:"user",select:"userName profilepic2.secure_url"})
return res.status(200).json({success:true,result:{populatepost}})

}