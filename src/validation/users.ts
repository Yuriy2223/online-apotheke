import { ProfileFormData } from "@/types/users";
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
    .max(100, "Максимум 100 символів")
    .lowercase()
    .trim(),
  // phone: yup
  //   .string()
  //   .required("Телефон обовʼязковий")
  //   .matches(/^\+?[1-9]\d{1,14}$/, "Невалідний формат телефону")
  //   .trim(),
  password: yup
    .string()
    .required("Пароль обовʼязковий")
    .min(6, "Пароль повинен містити мінімум 6 символів")
    .max(128, "Пароль не повинен перевищувати 128 символів")
    .trim(),
  confirmPassword: yup
    .string()
    .required("Підтвердження пароля обовʼязкове")
    .oneOf([yup.ref("password")], "Паролі повинні співпадати"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email обовʼязковий")
    .email("Невалідний формат email")
    .max(100, "Максимум 100 символів")
    .lowercase()
    .trim(),
  password: yup
    .string()
    .required("Пароль обовʼязковий")
    .min(6, "Пароль повинен містити мінімум 6 символів")
    .max(32, "Пароль не повинен перевищувати 32 символи")
    .trim(),
});

export const verifyEmailSchema = yup.object({
  token: yup.string().required("Токен верифікації обовʼязковий"),
});

export const schemaForgotPassword = yup.object().shape({
  email: yup
    .string()
    .required("Email обовʼязковий")
    .email("Невалідний формат email")
    .max(100, "Максимум 100 символів")
    .lowercase()
    .trim(),
});

export const schemaResetPassword = yup.object().shape({
  password: yup
    .string()
    .required("Пароль обовʼязковий")
    .min(6, "Пароль повинен містити мінімум 6 символів")
    .max(32, "Пароль не повинен перевищувати 32 символи")
    .trim(),
  confirmPassword: yup
    .string()
    .required("Підтвердження пароля обовʼязкове")
    .oneOf([yup.ref("password")], "Паролі повинні співпадати"),
});

export const refreshTokenSchema = yup.object({
  refreshToken: yup.string().min(1, "Refresh token обов'язковий"),
});

export const userProfileSchema: yup.ObjectSchema<ProfileFormData> = yup.object({
  name: yup.string().required("Імʼя обовʼязкове").min(2).max(50).trim(),
  phone: yup
    .string()
    .nullable()
    .optional()
    .transform((value) => (value === "" ? null : value))
    .matches(/^\+?[1-9]\d{7,14}$/, {
      message: "Невалідний номер телефону",
      excludeEmptyString: true,
    }),
  address: yup
    .string()
    .nullable()
    .optional()
    .transform((value) => (value === "" ? null : value)),
  avatar: yup
    .string()
    .nullable()
    .optional()
    .transform((value) => (value === "" ? null : value)),
});
