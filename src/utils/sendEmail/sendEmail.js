import nodemailer from "nodemailer"
export const subject={
  register:"acctivate account",
  resetPass:"reset-password",
  verifyEmail:"verify-email"
}
export const sendEmails= async({to,html,subject})=>{
    
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: process.env.user_email,
      pass: process.env.app_pass,
    },
  });
  
  // async..await is not allowed in global scope, must use a wrapper

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"social app 👻" <${process.env.user_email}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text: "Hello from social app?", // plain text body
      html, // html body
    })
}