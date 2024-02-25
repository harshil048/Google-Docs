import { createTransport } from "nodemailer";

const transporter = createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: "harshilbambhroliya048@gmail.com",
    pass: "txerjhgtltvmoxbo",
  },
  secure: true,
});

export default transporter;
