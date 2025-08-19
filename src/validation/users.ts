import { ProfileFormData } from "@/types/users";
import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .trim(),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .max(100, "Maximum 100 characters")
    .lowercase()
    .trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must not exceed 128 characters")
    .trim(),
  confirmPassword: yup
    .string()
    .required("Password confirmation required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email required")
    .email("Invalid email format")
    .max(100, "Maximum 100 characters")
    .lowercase()
    .trim(),
  password: yup
    .string()
    .required("Password required")
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must not exceed 32 characters")
    .trim(),
});

export const verifyEmailSchema = yup.object({
  token: yup.string().required("Verification token required"),
});

export const schemaForgotPassword = yup.object().shape({
  email: yup
    .string()
    .required("Email required")
    .email("Invalid email format")
    .max(100, "Maximum 100 characters")
    .lowercase()
    .trim(),
});

export const schemaResetPassword = yup.object().shape({
  password: yup
    .string()
    .required("Password required")
    .min(6, "Password must be at least 6 characters long")
    .max(32, "Password must not exceed 32 characters long")
    .trim(),
  confirmPassword: yup
    .string()
    .required("Password confirmation required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const refreshTokenSchema = yup.object({
  refreshToken: yup.string().min(1, "Refresh token required"),
});

export const userProfileSchema: yup.ObjectSchema<ProfileFormData> = yup.object({
  name: yup
    .string()
    .required("Name required")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters")
    .trim(),
  phone: yup
    .string()
    .nullable()
    .optional()
    .transform((value) => (value === "" ? null : value))
    .matches(/^\+?[1-9]\d{7,14}$/, {
      message: "Invalid phone number",
    })
    .trim(),
  address: yup
    .string()
    .nullable()
    .optional()
    .transform((value) => (value === "" ? null : value))
    .min(5, "Address must contain at least 5 characters")
    .max(200, "Address must contain a maximum of 200 characters")
    .matches(/^[a-zA-Zа-яА-ЯіІїЇєЄ0-9\s,./№]+$/, {
      message:
        "Address can contain letters, numbers, spaces and symbols: , . / №",
    })
    .trim(),
  avatar: yup
    .string()
    .nullable()
    .optional()
    .transform((value) => (value === "" ? null : value)),
});
