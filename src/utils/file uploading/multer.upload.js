import multer, { diskStorage } from "multer"
import { nanoid } from "nanoid"
import path from "path"
import fs from "fs"
export const filevalidation={
    image:["image/png","image/jpng"]
}
export const upload=(filetype,folder)=>{
    const storage=diskStorage({
        // destination:folder,
        destination: (req,file,cb)=>{
            const folderpath=path.resolve(".",`${folder}/${req.user._id}`)
            console.log(folderpath);
            
            const foldername=`${folder}/${req.user._id}`
            if(fs.existsSync(foldername))return cb(null,foldername)
                return fs.mkdirSync(folderpath)
        } ,
        filename: (req,file,cb)=>{
            console.log(file);
            cb(null,nanoid() + " "+ file.originalname)

        }  ,
      
    })
    const filefilter=(req,file,cb)=>{
        if(!filetype.includes(file.mimType))
        {return cb(new Error ("invalid format"),false)

        }else{
            return cb (null,true)
        }


    }
    const multeruploads=multer({storage,filefilter})
    return multeruploads
}
export const uploudcloud=()=>{
    const storage=diskStorage({})
    const multeruploud=multer({storage})
    return multeruploud
}

