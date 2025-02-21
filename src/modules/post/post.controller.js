import { Router } from "express";
import { uploudcloud } from "../../utils/file uploading/multer.upload.js";
import * as postvalidation from "../post/post.validation.js"
import validation from "../../middleware/validation.middleware.js";
import * as postService from "./post.services.js"
import asynchandler from "../../utils/errorhandling/asynchandler.js"
import { roles } from "../../DB/model/user/user.model.js";
import {isAuthentecated} from "../../middleware/authentication.middleware.js"
import {isAuthorized} from "../../middleware/authorization.middleware.js"
import { postEndpoint } from "./endpoint.js";
import commentRouter from "../comment/comment.controller.js"
const router=Router()
router.use("/:postId/comment",commentRouter)
router.post("/",isAuthentecated,isAuthorized(postEndpoint.createpost),uploudcloud().array("images"),validation(postvalidation.creatpostval),asynchandler(postService.createpost))
router.patch("/updatepost/:id",isAuthentecated,isAuthorized(postEndpoint.updatepost),uploudcloud().array("images"),validation(postvalidation.updatepost),asynchandler(postService.updatepost))
router.patch("/softdelete/:id",isAuthentecated,isAuthorized(postEndpoint.softdeleted),validation(postvalidation.softdeleted),asynchandler(postService.softdeleted))
router.patch("/restorepost/:id",isAuthentecated,isAuthorized(postEndpoint.restorepost),validation(postvalidation.restorepost),asynchandler(postService.restorepost))
router.get("/:id",isAuthentecated,isAuthorized(postEndpoint.getsinglepost),validation(postvalidation.getsinglepost),asynchandler(postService.getsinglepost))
router.get("/getall/activeposts",isAuthentecated,isAuthorized(postEndpoint.getallactiveposts),asynchandler(postService.getallactiveposts))
router.get("/getall/deletedposts",isAuthentecated,isAuthorized(postEndpoint.getalldeletedposts),asynchandler(postService.getalldeletedposts))
router.patch("/:id/like-unlike",isAuthentecated,isAuthorized(postEndpoint.likeunlike),validation(postvalidation.likeunlike),asynchandler(postService.likeunlike))
export default router