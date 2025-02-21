import Comment from "../../DB/model/comment/comment.model.js"
import Post from "../../DB/model/post/post.model.js"
import { roles } from "../../DB/model/user/user.model.js";
import cloudinary from "../../utils/file uploading/multer.cloudinary.config.js";
export const createComment=async (req,res,next)=>{
    const{text}=req.body
    const{postId}=req.params
    const post= await Post.findOne({_id:postId,isDeleted:false})
    if(!post)return next(new Error("post not found",{cause:400}))
        let image;
    if(req.file){
        const{secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`social app/users/${post.user}/posts/${post.cloudfolder}/comments`})
    
        image={secure_url,public_id}
    }
 
    const comment=await Comment.create({text,image,post:postId,user:req.user._id})
    return res.status(200).json({success:true,result:{comment},message:"comment created successfuly"})
}

export const updatecomment=async(req,res,next)=>{
    const{id}=req.params
    const {text}=req.body
    const comment=await Comment.findOne({_id:id,isDeleted:false})
    if(!comment) return next(new Error ("comment not found ",{cause:400}))
        const post =await Post.findOne({_id:comment.post,isDeleted:false})
    if(!post) return next(new Error("post not found",{cause:400}))
        if(comment.user.toString()!=req.user._id.toString())
            return next(new Error ("you not allowed to update comment",{cause:400}))
        let image;
        if(req.file){
            const{ secure_url,public_id }=await cloudinary.uploader.upload(req.file.path,{folder:`social app/users/${post.user}/posts/${post.cloudfolder}/comments`})
        image={ secure_url,public_id }
        console.log(image);
       
        if(comment.image){
            await cloudinary.uploader.destroy(comment.image.public_id)
        } 
        
    }
      
    comment.image=image
    
       
        comment.text=text?text:comment.text
        await comment.save()
        return res.status(200).json({success:true,result:{comment},message:"comment updated successfully"})
}


export const deletecomment=async(req,res,next)=>{
    const {id}=req.params
    const comment =await Comment.findOne({_id:id,isDeleted:false})
    if(!comment)return next(new Error ("commentt not found ",{cause:400}))
        const post =await Post.findOne({_id:comment.post,isDeleted:false})
    if(!post)return next(new Error("post not found",{cause:400}))
        const postowner=post.user.toString()==req.user._id.toString()
    const commentowner=comment.user.toString()==req.user._id.toString()
    const admin= req.user.role== roles.admin 
    if(!postowner && !commentowner && !admin )return next(new Error("you are not allowed to delete comment",{cause:400}))
        comment.isDeleted=true
    comment.deletedBy=req.user._id
    return res.status(200).json({success:true,message:"comment deleted successfully",result:{comment}})
}
export const getAllcomment=async(req,res,next)=>{
    const{postId}=req.params
    const post =await Post.findOne({isDeleted:false,_id:postId})
    if(!post) return next(new Error("post not found",{cause:400}))
        const comments=await Comment.find({post:postId,isDeleted:false,parentcomment:{$exists:false}})
    return res.status(200).json({success:true,result:comments})
}
export const likeunlikecomment=async(req,res,next)=>{
    const {id}=req.params
    const comment=await Comment.findOne({_id:id,isDeleted:false})
    if(!comment) return next(new Error ("comment not found ",{cause:400}))
        const islikesexist=comment.likes.find((user)=>user.toString()==req.user._id.toString())
    if(!islikesexist){
        comment.likes.push(req.user._id)
    }else{
        comment.likes=comment.likes.filter((user)=>user.toString() != req.user._id.toString())
    }
     await comment.save()
     return res.status(200).json({success:true,result:{comment}})


}
export const addreply=async(req,res,next)=>{
    const{id,postId}=req.params
    const {text}=req.body
    const comment=await Comment.findOne({_id:id,isDeleted:false,post:postId})
    if(!comment) return next(new Error ("comment not found ",{cause:400}))
        const post =await Post.findOne({_id:postId,isDeleted:false})
    if(!post)return next(new Error("post not found",{cause:400}))
         let image
        if(req.file){
            const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{folder:`social app/users/${post.user}/posts/${post.cloudfolder}/comments/${comment._id}`})
image={secure_url,public_id}
        }
        const reply =await Comment.create({text,image,post:postId,parentcomment:comment._id,user:req.user._id})
        return res.status(200).json({success:true,result:{reply}})
}



export const hardDelete=async(req,res,next)=>{
    const {id}=req.params
    const comment=await Comment.findById(id)
    if(!comment) return next(new Error ("comment not found ",{cause:400}))
        const post =await Post.findOne({_id:comment.post,isDeleted:false})
    if(!post)return next(new Error("post not found",{cause:400}))
        const postowner =req.user._id.toString()==post.user.toString()
        const commentowner =req.user._id.toString()==comment.user.toString()
        const admin=req.user.role==roles.admin
        if(!postowner && !commentowner && !admin)
            return next(new Error("you are not allwed to delete comment ",{cause:400}))
        if(comment.image){
            await cloudinary.uploader.destroy(comment.image.public_id)
        }
        await comment.deleteOne()
        return res.status(200).json({success:true,message:"comment delete successfully"})
    
}