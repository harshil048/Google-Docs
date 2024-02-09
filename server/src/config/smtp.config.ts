import { createTransport } from "nodemailer";

const transporter = createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth:{
    user: "harshilarcade@gmail.com",
    pass: "Harshil@123"
  },
  secure: true
});

export default transporter;