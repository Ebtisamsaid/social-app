import { Router } from "express";
import { isAuthentecated } from "../../middleware/authentication.middleware.js";
import { isAuthorized } from "../../middleware/authorization.middleware.js"; 
import  validation  from "../../middleware/validation.middleware.js"; 
import { commentEndpoint } from "./comment.Endpoint.js";
import asynchandler from "../../utils/errorhandling/asynchandler.js"
import * as commentSchema from "./comment.validation.js"

import * as commentService from "./comment.service.js"
import { uploudcloud } from "../../utils/file uploading/multer.upload.js";
const router=Router({mergeParams:true})


router.post("/",isAuthentecated,isAuthorized(commentEndpoint.createComment),uploudcloud().single("image"),validation(commentSchema.createComment),asynchandler(commentService.createComment))
router.patch("/:id",isAuthentecated,isAuthorized(commentEndpoint.updatecomment),uploudcloud().single("image"),validation(commentSchema.updatecomment),asynchandler(commentService.updatecomment))
router.patch("/delete/:id",isAuthentecated,isAuthorized(commentEndpoint.deletecomment),uploudcloud().single("image"),validation(commentSchema.deletecomment),asynchandler(commentService.deletecomment))
router.get("/",isAuthentecated,isAuthorized(commentEndpoint.getAllcomment),validation(commentSchema.getAllcomment),asynchandler(commentService.getAllcomment))
router.patch("/like-unlike/:id",isAuthentecated,isAuthorized(commentEndpoint.likeunlikecomment),validation(commentSchema.likeunlikecomment),asynchandler(commentService.likeunlikecomment))
router.post("/addreply/:id",isAuthentecated,isAuthorized(commentEndpoint.addreply),uploudcloud().single("image"),validation(commentSchema.addreply),asynchandler(commentService.addreply))
router.delete("/delete/:id",isAuthentecated,isAuthorized(commentEndpoint.hardDelete),validation(commentSchema.hardDelete),asynchandler(commentService.hardDelete))


export default router