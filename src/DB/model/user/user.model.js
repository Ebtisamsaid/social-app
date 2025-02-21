
import mongoose, { Schema } from "mongoose";
export const roles={
    user:"user",
    admin:"admin"
}
export const providers={
    system:"system",
    google:"google"
}
export const defaultcloudpic={
    publicidDefault:"social app/vnw066cov7omvsujzhuo",
    secureurlDefault:"https://res.cloudinary.com/dt99ajmby/image/upload/v1738862697/social%20app/vnw066cov7omvsujzhuo.jpg"
}
 export const defaultpic="uploads\\users\\5Gl2LRiPZC_fCWMg_uya5 Default_pfp.jpg"
const userSchema = new Schema({
    userName:String,
    phone:{type:String,required:true},
    email:{type:String,unique:[true,"email is already exist"],required:true ,lowerCase:true,match:/^[\w-\.]+@(\w){3,10}\.\w{2,5}$/},
    isAcctivate:{type:Boolean,default:false},
    isDelete:{type:Boolean,default:false},
    role:{type:String,enum:Object.values(roles)},
    password:{type:String,required:function(){
        return this.provider ==providers.system ? true:false
    }},
    provider:{type:String,enum:Object.values(providers)},
    TempEmail:{type:String,default:null},
    changePasswordAt:Date,
    profilepic:{type:String,default:defaultpic},
    profilepic2:{secure_url:{type:String,default:defaultcloudpic.secureurlDefault},public_id:{type:String,default:defaultcloudpic.publicidDefault}}

})

// model 
const User=mongoose.model("User",userSchema)
export default User