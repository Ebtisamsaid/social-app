import { Router } from "express";
import * as userService from "./user.service.js"
import { isAuthentecated } from "../../middleware/authentication.middleware.js";
import { filevalidation, upload, uploudcloud } from "../../utils/file uploading/multer.upload.js";
import asynchandler from "../../utils/errorhandling/asynchandler.js"
import { userendpoint } from "./userendpoint.js";
import {isAuthorized} from "../../middleware/authorization.middleware.js"
 const router=Router()
 router.post('/profilepic',isAuthentecated,isAuthorized(userendpoint.profilepic),upload(filevalidation.image,`uploads/users`).single("image"),asynchandler(userService.profilepic))
 router.delete('/delprofilepic',isAuthentecated,isAuthorized(userendpoint.delprofilepic),asynchandler(userService.delprofilepic))
 router.post('/profilepic2',isAuthentecated,isAuthorized(userendpoint.profilepic2),uploudcloud().single("image"),asynchandler(userService.profilepic2))
 router.delete('/delprofilepic2',isAuthentecated,isAuthorized(userendpoint.delprofilepic2),asynchandler(userService.delprofilepic2))
export default router