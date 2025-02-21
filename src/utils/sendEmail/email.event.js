import EventEmitter from "events";
import { sendEmails } from "./sendEmail.js";
import { generatehtml } from "./generatehtml.js";

 export const eventEmitter=new EventEmitter()
 eventEmitter.on("sendEmail",async(email,otp,subject,html)=>{
    sendEmails({
        to:email,
        html,
        subject
    })


 })