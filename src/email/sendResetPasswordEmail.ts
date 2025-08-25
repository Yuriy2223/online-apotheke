import nodemailer from "nodemailer";

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

const createTransporter = () => {
  const config: EmailConfig = {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  };

  return nodemailer.createTransport(config);
};

export const sendResetPasswordEmail = async (
  email: string,
  resetToken: string
): Promise<void> => {
  try {
    const transporter = createTransporter();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || "E-Pharmacy"}" <${
        process.env.SMTP_USER
      }>`,
      to: email,
      subject: "🔒 Reset Your Password - E-Pharmacy",
      text: `
Reset Your Password - E-Pharmacy

Hello!

You received this email because a password reset request was submitted for your account.

Password reset link:
${resetUrl}

This link is valid for 15 minutes.

If you did not request a password reset, please ignore this email.

Best regards,
E-Pharmacy Team
      `,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Reset Your Password - E-Pharmacy</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f7f7; font-family: Arial, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    
    <!-- Main container -->
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f7f7f7; min-height: 100vh;">
        <tr>
            <td align="center" valign="top" style="padding: 20px 10px;">
                
                <!-- Email container -->
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-width: 600px;">
                    
                    <!-- Header with logo -->
                    <tr>
                        <td style="padding: 40px 30px 30px 30px; text-align: center; background-color: #ffffff;">
                            
                            <!-- Logo -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding-bottom: 20px;">
                                        <img src="https://res.cloudinary.com/drf6qahjj/image/upload/v1756046662/e-parmacy/lxxnrgtq71v3wh2dtqvu.png" 
                                             alt="E-Pharmacy Logo" 
                                             width="80" 
                                             height="80"
                                             style="display: block; max-width: 80px; height: auto; border: 0;">
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Title -->
                            <h1 style="color: #2d3748; font-size: 28px; font-weight: bold; margin: 0 0 10px 0; line-height: 1.2;">
                                🔒 E-Pharmacy
                            </h1>
                            
                            <!-- Subtitle -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <table cellpadding="0" cellspacing="0" border="0" style="background-color: #e8f5e8; border-radius: 20px; display: inline-block;">
                                            <tr>
                                                <td style="padding: 8px 16px; color: #2d5016; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                                                    🏥 YOUR TRUSTED HEALTHCARE PARTNER
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="color: #4a5568; font-size: 16px; line-height: 1.5; margin: 20px 0 0 0;">
                                You received this email because a password reset request was submitted for your account.
                            </p>
                            
                        </td>
                    </tr>
                    
                    <!-- Content with button -->
                    <tr>
                        <td style="padding: 20px 30px 40px 30px; background-color: #ffffff;">
                            
                            <!-- Reset password block -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f0f9f0; border: 2px dashed #59b17a; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 25px 20px; text-align: center;">
                                        
                                        <!-- Block title -->
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td align="center" style="padding-bottom: 20px;">
                                                    <span style="background-color: #ffffff; color: #3f945f; font-size: 12px; font-weight: bold; padding: 5px 10px; border-radius: 15px;">
                                                        🔐 PASSWORD RESET
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <p style="color: #2d5016; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0; font-weight: 500;">
                                            🔑 Click the button below to create a new password:
                                        </p>
                                        
                                        <!-- Reset button -->
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td align="center" style="padding: 10px 0;">
                                                    <a href="${resetUrl}" 
                                                       style="display: inline-block; background-color: #59b17a; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 50px; font-weight: bold; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
                                                        🔒 RESET PASSWORD
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Alternative link -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 25px;">
                                <tr>
                                    <td style="padding: 20px; background-color: #f8fdf8; border-radius: 8px; border-left: 4px solid #59b17a;">
                                        
                                        <p style="color: #718096; font-size: 14px; margin: 0 0 10px 0;">
                                            🔗 Alternative: Copy and paste this link:
                                        </p>
                                        
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px; word-break: break-all;">
                                                    <span style="font-family: Courier, monospace; color: #3f945f; font-size: 12px;">
                                                        ${resetUrl}
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                    </td>
                                </tr>
                            </table>

                            <!-- Warning section -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 25px;">
                                <tr>
                                    <td style="padding: 20px; background-color: #e8f5e8; border: 2px solid #59b17a; border-radius: 8px;">
                                        
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td align="center" style="padding-bottom: 10px;">
                                                    <span style="background-color: #ffffff; color: #2d5016; font-size: 12px; font-weight: bold; padding: 5px 10px; border-radius: 15px;">
                                                        ⚠️ IMPORTANT
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>

                                        <p style="color: #2d5016; font-size: 14px; margin: 0 0 10px 0; line-height: 1.5;">
                                            <strong>• This link is valid for 15 minutes</strong><br>
                                            • If you did not request a password reset, ignore this email<br>
                                            • Never share this link with anyone else
                                        </p>
                                        
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 25px 30px; background-color: #f9f9f9; text-align: center;">
                            
                            <!-- Support info -->
                            <p style="color: #4a5568; font-size: 14px; margin: 0 0 15px 0;">
                                If you have any questions, please contact our support team.
                            </p>
                            
                            <p style="color: #4a5568; font-size: 14px; margin: 0 0 15px 0; font-weight: 500;">
                                Best regards,<br>
                                <strong>E-Pharmacy Team</strong>
                            </p>
                            
                            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;">
                            
                            <p style="color: #9ca3af; font-size: 11px; margin: 0;">
                                This email was sent automatically, please do not reply.<br>
                                © ${new Date().getFullYear()} E-Pharmacy. All rights reserved.
                            </p>
                            
                        </td>
                    </tr>
                    
                </table>
                
            </td>
        </tr>
    </table>
    
</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch {
    throw new Error("Failed to send reset password email");
  }
};
