import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
): Promise<void> => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

  const mailOptions = {
    from: `${process.env.EMAIL_FROM_NAME || "E-Pharmacy"} <${
      process.env.SMTP_USER
    }>`,
    to: email,
    subject: "🌿 Confirm your email address - E-Pharmacy",
    text: `
Welcome to E-Pharmacy!

Thank you for registering! To complete your registration, please confirm your email address.

Verification link:
${verificationUrl}

This link is valid for 15 minutes.

If you did not register on our website, please ignore this message.

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
    <title>Email Verification - E-Pharmacy</title>
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
                                🌿 E-Pharmacy
                            </h1>
                            
                            <!-- Subtitle -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td align="center">
                                        <table cellpadding="0" cellspacing="0" border="0" style="background-color: #e8f5e8; border-radius: 20px; display: inline-block;">
                                            <tr>
                                                <td style="padding: 8px 16px; color: #2d5016; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
                                                    🏥 A TRUSTED PARTNER IN HEALTHCARE
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="color: #4a5568; font-size: 16px; line-height: 1.5; margin: 20px 0 0 0;">
                                Welcome to your digital pharmacy! To complete your registration, please confirm your email address.
                            </p>
                            
                        </td>
                    </tr>
                    
                    <!-- Content with button -->
                    <tr>
                        <td style="padding: 20px 30px 40px 30px; background-color: #ffffff;">
                            
                            <!-- Verification block -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f0f9f0; border: 2px dashed #59b17a; border-radius: 12px;">
                                <tr>
                                    <td style="padding: 25px 20px; text-align: center;">
                                        
                                        <!-- Block title -->
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td align="center" style="padding-bottom: 20px;">
                                                    <span style="background-color: #ffffff; color: #3f945f; font-size: 12px; font-weight: bold; padding: 5px 10px; border-radius: 15px;">
                                                        📋 VERIFICATION REQUIRED
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <p style="color: #2d5016; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0; font-weight: 500;">
                                            🔐 Protect your account by clicking the confirmation button below:
                                        </p>
                                        
                                        <!-- Verification button -->
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td align="center" style="padding: 10px 0;">
                                                    <a href="${verificationUrl}" 
                                                       style="display: inline-block; background-color: #59b17a; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 50px; font-weight: bold; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">
                                                        ✅ CONFIRM EMAIL
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
                                                        ${verificationUrl}
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 25px 30px; background-color: #f9f9f9; text-align: center;">
                            
                            <!-- Expiration info -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding-bottom: 15px;">
                                        <table cellpadding="0" cellspacing="0" border="0" style="background-color: #e8f5e8; border-radius: 20px; display: inline-block;">
                                            <tr>
                                                <td style="padding: 10px 20px; color: #2d5016; font-size: 13px; font-weight: 500;">
                                                    ⚡ This link is valid for 15 minutes
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.4;">
                                If you did not register on our website, please ignore this message.
                            </p>
                            
                            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;">
                            
                            <p style="color: #9ca3af; font-size: 11px; margin: 0;">
                                © 2025 E-Pharmacy. All rights reserved.
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
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};
