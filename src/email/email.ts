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
    from: process.env.SMTP_USER,
    to: email,
    subject: "Підтвердження email адреси",
    text: `Дякуємо за реєстрацію! Підтвердіть email за посиланням: ${verificationUrl}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Підтвердження email адреси</h2>
        <p>Дякуємо за реєстрацію! Для завершення реєстрації підтвердіть вашу email адресу.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}"
             style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            Підтвердити Email
          </a>
        </div>
        <p><small>Це посилання дійсне протягом 15 хвилин.</small></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Помилка при відправці листа:", error);
    throw error;
  }
};
// <p>Або скопіюйте це посилання в ваш браузер:</p>
// <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
