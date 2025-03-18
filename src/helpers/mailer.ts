import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import UserModel from "@/models/usermodel";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  console.log(email, emailType, userId);
  console.log(typeof emailType);
  try {
    // todo configure mail for usages
    const hashedtoken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await UserModel.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedtoken,
          verifyTokenExpiry:new Date( Date.now() + 3600000),
        },
      });
    } else if (emailType === "Reset")
      await UserModel.findByIdAndUpdate(userId, {
        $set: {
          forgetPasswordToken: hashedtoken,
          forgetPasswordTokenExpiry:new Date( Date.now() + 3600000),
        },
      });

    // Looking to send emails in production? Check out our Email API/SMTP product!
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "0f475eb2686b89",
        pass: "c0741df9e7ed59",
      },
    });

    const mailOptions = {
      from: "karansengar1313@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedtoken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser.
      <br> ${process.env.DOMAIN}/verifyemail?token=${hashedtoken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (err) {
    console.error("Error sending email:", err);
    throw new Error("Failed to send email");
  }
};
