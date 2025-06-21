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

    // const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Скидання пароля - Online Apotheke",
      html: `
        <!DOCTYPE html>
        <html lang="uk">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Скидання пароля</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .container {
              background-color: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              color: #2c5aa0;
              margin-bottom: 30px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #007bff;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
              font-weight: bold;
            }
            .button:hover {
              background-color: #0056b3;
            }
            .warning {
              background-color: #fff3cd;
              border: 1px solid #ffeaa7;
              color: #856404;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 12px;
              color: #666;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔒 Скидання пароля</h1>
            </div>
            
            <p>Привіт!</p>
            
            <p>Ви отримали цей лист, оскільки було надіслано запит на скидання пароля для вашого облікового запису в Online Apotheke.</p>
            
            <p>Натисніть на кнопку нижче, щоб створити новий пароль:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Скинути пароль</a>
            </div>
            
            <p>Або скопіюйте та вставте це посилання у ваш браузер:</p>
            <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 5px;">
              ${resetUrl}
            </p>
            
            <div class="warning">
              <strong>⚠️ Важливо:</strong>
              <ul>
                <li>Це посилання дійсне протягом 15 хвилин</li>
                <li>Якщо ви не запитували скидання пароля, проігноруйте цей лист</li>
                <li>Ніколи не передавайте це посилання іншим особам</li>
              </ul>
            </div>
            
            <p>Якщо у вас виникли питання, зв'яжіться з нашою службою підтримки.</p>
            
            <p>З найкращими побажаннями,<br>Команда Online Apotheke</p>
            
            <div class="footer">
              <p>Цей лист було надіслано автоматично, будь ласка, не відповідайте на нього.</p>
              <p>&copy; ${new Date().getFullYear()} Online Apotheke. Всі права захищені.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Скидання пароля - Online Apotheke
        
        Привіт!
        
        Ви отримали цей лист, оскільки було надіслано запит на скидання пароля для вашого облікового запису.
        
        Перейдіть за посиланням для створення нового пароля:
        ${resetUrl}
        
        Важливо:
        - Посилання дійсне протягом 15 хвилин
        - Якщо ви не запитували скидання пароля, проігноруйте цей лист
        
        З найкращими побажаннями,
        Команда Online Apotheke
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Reset password email sent to: ${email}`);
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw new Error("Failed to send reset password email");
  }
};

export const sendEmailVerificationEmail = async (
  email: string,
  verificationToken: string
): Promise<void> => {
  try {
    const transporter = createTransporter();

    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Підтвердження email - Online Apotheke",
      html: `
        <!DOCTYPE html>
        <html lang="uk">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Підтвердження email</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .container {
              background-color: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              color: #28a745;
              margin-bottom: 30px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background-color: #28a745;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
              font-weight: bold;
            }
            .button:hover {
              background-color: #218838;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 12px;
              color: #666;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Підтвердження email</h1>
            </div>
            
            <p>Привіт!</p>
            
            <p>Дякуємо за реєстрацію в Online Apotheke! Для завершення реєстрації, будь ласка, підтвердіть вашу email адресу.</p>
            
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">Підтвердити email</a>
            </div>
            
            <p>Або скопіюйте та вставте це посилання у ваш браузер:</p>
            <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 5px;">
              ${verificationUrl}
            </p>
            
            <p>Якщо ви не реєструвалися в нашому сервісі, просто проігноруйте цей лист.</p>
            
            <p>З найкращими побажаннями,<br>Команда Online Apotheke</p>
            
            <div class="footer">
              <p>Цей лист було надіслано автоматично, будь ласка, не відповідайте на нього.</p>
              <p>&copy; ${new Date().getFullYear()} Online Apotheke. Всі права захищені.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Підтвердження email - Online Apotheke
        
        Привіт!
        
        Дякуємо за реєстрацію! Для завершення реєстрації підтвердіть email:
        ${verificationUrl}
        
        Якщо ви не реєструвалися, проігноруйте цей лист.
        
        З найкращими побажаннями,
        Команда Online Apotheke
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email verification sent to: ${email}`);
  } catch (error) {
    console.error("Error sending email verification:", error);
    throw new Error("Failed to send email verification");
  }
};
