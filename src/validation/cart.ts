import * as yup from "yup";

export const cartSchema = yup.object({
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
    .trim(),

  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\+?[\d\s\-\(\)]{10,}$/, "Invalid phone format")
    .trim(),

  address: yup
    .string()
    .required("Address required")
    .min(10, "Address must be at least 10 characters long")
    .max(150, "Address must not exceed 150 characters long")
    .trim(),
});
