import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("Імʼя обовʼязкове")
    .min(2, "Імʼя повинно містити мінімум 2 символи")
    .max(50, "Імʼя не повинно перевищувати 50 символів")
    .trim(),
  email: yup
    .string()
    .required("Email обовʼязковий")
    .email("Невалідний формат email")
    .lowercase()
    .trim(),
  phone: yup
    .string()
    .required("Телефон обовʼязковий")
    .matches(/^\+?[1-9]\d{1,14}$/, "Невалідний формат телефону")
    .trim(),
  password: yup
    .string()
    .required("Пароль обовʼязковий")
    .min(6, "Пароль повинен містити мінімум 6 символів")
    .max(32, "Пароль не повинен перевищувати 32 символи"),
  confirmPassword: yup
    .string()
    .required("Підтвердження пароля обовʼязкове")
    .oneOf([yup.ref("password")], "Паролі повинні співпадати"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email обовʼязковий")
    .email("Невалідний формат email"),
  password: yup
    .string()
    .required("Пароль обовʼязковий")
    .min(1, "Пароль не може бути пустим"),
});

export const verifyEmailSchema = yup.object({
  token: yup.string().required("Токен верифікації обовʼязковий"),
});

export const refreshTokenSchema = yup.object({
  refreshToken: yup.string().min(1, "Refresh token обов'язковий"),
});
