import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'lautimartinez77@gmail.com', // generated ethereal user
      pass: 'zkiifbhgxelwsuwg', // generated ethereal password
    },
  });

transporter.verify().then(() => {
    console.log('Ready to send emails!')
})