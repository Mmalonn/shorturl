const nodemailer=require("nodemailer")
require ("dotenv").config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.userEmail,
        pass: process.env.passEmail
    },
  });

  transporter.verify(()=>{
      console.log("listo para enviar mensajes");
  })

  module.exports={
    transporter
}