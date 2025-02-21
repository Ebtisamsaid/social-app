import  { Router } from "express";
import * as authSchema from "./auth.validation.js"
import validation from "../../middleware/validation.middleware.js"
import asynchandler from "../../utils/errorhandling/asynchandler.js"
import * as authService from "./auth.service.js"
import { isAuthentecated } from "../../middleware/authentication.middleware.js";
const router=Router()
router.post("/register",validation(authSchema.registervalidation),asynchandler(authService.register))
router.post("/verify",validation(authSchema.otpsenVali),asynchandler(authService.sendOtp))
router.post("/login",validation(authSchema.loginSchema),asynchandler(authService.login))
 router.post("/resetPassword",validation(authSchema.resetPasswordSchema),asynchandler(authService.resetPassword))
 router.post("/forget-password",validation(authSchema.forgetpasswordSchema),asynchandler(authService.forgetpassword))
router.patch("/freeze",isAuthentecated,asynchandler(authService.freeze))
router.post("/new-access",validation(authSchema.newAccessSchema),asynchandler(authService.newAccess))
router.post("/gmailLogin",validation(authSchema.gmailLoginvalidation),asynchandler(authService.gmailLogin))
router.patch("/update-email",validation(authSchema.updateEmailvalidation),isAuthentecated,asynchandler(authService.updateEmail))
router.get("/verify-email/:token",validation(authSchema.verifyEmail),asynchandler(authService.verifyEmail))
// router.get("/updatePassword",isAuthentecated,validation(authSchema.updatePassword),asynchandler(authService.updatePassword))
export default router