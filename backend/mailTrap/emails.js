import { verify } from "crypto"
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplate.js"
import { mailtrap_client, sender } from "./mailtrap.js"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  export const sendVerificationEmail = async(email, verificationToken)=>{
    const recipient = email

    try{
        const response = await transporter.sendMail({
            from: sender, // sender address
            to: recipient, // list of receivers
            subject: "Verify your email", // Subject line
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
          });
        
        console.log("email sent successfully", response);
    }
    catch(error){
        console.log(error);
        throw new Error (`Error sending verification code ${error}`)

    }
}

// export const sendVerificationEmail1 = async(email, verificationToken)=>{
//     const recipient = [{email}]

//     try{
//         const response = await mailtrap_client.send({
//           from: sender,
//           to:recipient,
//           subject:"Verify your email",
//           html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
//           category:"email verification"
//         })
//         console.log("email sent successfully", response);
//     }
//     catch(error){
//         throw new Error (`Error sending verification code ${error}`)

//     }
// }

export const sendWelcomeEmail = async(email, name)=>{
    const recipient = email
    try {
       const response = await transporter.sendMail({
            from: sender, // sender address
            to: recipient, // list of receivers
            subject: "Welcome to Git pixel", // Subject line
            html: WELCOME_EMAIL_TEMPLATE.replace("{firstName}", name),
          });
       console.log("email sent successfully", response);
        
    }
    catch(error){
        console.log(`Error verifying  ${error}`);
        throw new Error (`Error verifying  ${error}`)

    }
}

export const sendPasswordResetEmail = async(email, resetURL)=>{
    const recipient = [{email}]
    try {
        const response = mailtrap_client.send({
            from:sender,
            to:recipient,
            subject:" Reset your passowrd",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category:"password reset"
        })
        
    } catch (error) {
        console.log(`Error sending password reset  ${error}`);
        throw new Error (`Error sending password reset  ${error}`)
        
    }

}

export const sendResetSuccessfulEmail = async(email)=>{
    const recipient = [{email}]
    try {
        const response = mailtrap_client.send({
            from:sender,
            to:recipient,
            subject:"Password changed successful",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"reset password"
        })
        
    } catch (error) {
        console.log(`Error sending password reset  ${error}`);
        throw new Error (`Error sending password reset  ${error}`)
        
        
    }
}