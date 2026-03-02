import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to, subject) {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: to,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            
            <h2 style="color: #333; text-align: center;">
              🎉 Registration Successful
            </h2>

            <p style="font-size: 16px; color: #555;">
              Hello,
            </p>

            <p style="font-size: 16px; color: #555;">
              Your account has been successfully created. You are now ready to explore and get started.
            </p>

            <p style="font-size: 14px; color: #888;">
              If you did not create this account, please ignore this email.
            </p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

            <p style="font-size: 12px; color: #aaa; text-align: center;">
              © ${new Date().getFullYear()} Your Company. All rights reserved.
            </p>

          </div>
        </div>
      `,
    });
  } catch (error) {
    console.log("error at sending email:-", error);
  }
}
